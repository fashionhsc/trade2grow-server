const crypto = require('crypto')
const { razorpayInstance } = require("../../config/razorpay");
const paymentModal = require("../../models/payment");
const ErrorClass = require("../../utils/errorClass");
const tryCatch = require("../../utils/tryCatch");
const userModal = require('../../models/user');

exports.createOrder = tryCatch(async (req, res, next) => {
    let { userId, planType, amount, currentStage } = req.body;
    if (!userId || !planType || !amount) return next(new ErrorClass('Missing params', 400));

    // Price in paise (INR) 
    amount = amount * 100;

    const options = {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Save payment record in MongoDB so that webhook can access it
    const payment = await paymentModal.create({
        userId,
        stageId: currentStage,
        amount,
        currency: 'INR',
        status: 'pending',
        provider: 'razorpay',
        orderId: order.id,
        receipt: options.receipt
    });

    res.json({ orderId: order.id, amount: options.amount, currency: options.currency, key: process.env.RAZORPAY_KEY_ID });
})


exports.verifyPayment = tryCatch(async (req, res, next) => {
    const { orderId, paymentId, signature } = req.body;
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest('hex');

    if (generatedSignature !== signature) return next(new ErrorClass('Invalid signature', 400));
    const payment = await paymentModal.findOneAndUpdate(
        { orderId },
        { status: 'success', paymentId }
    );

    await userModal.findByIdAndUpdate(payment.userId, { isPaidUser: true });

    res.json({ success: true });
})

exports.razorpayWebhook = tryCatch(async (req, res, next) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');


    if (shasum === req.headers['x-razorpay-signature']) {
        const event = req.body.event;

        if (event === 'payment.captured') {
            const paymentData = req.body.payload.payment.entity;

            // Update payment status
            const paymentRecord = await paymentModal.findOneAndUpdate(
                { orderId: paymentData.order_id },
                { status: 'success', paymentId: paymentData.id },
                { new: true }
            );

            // Mark user as paid
            if (paymentRecord?.userId) {
                await userModal.findByIdAndUpdate(paymentRecord.userId, {
                    isPaidUser: true
                });
            }
        }

        res.json({ status: 'ok' });
    } else {
        res.status(400).json({ status: 'invalid signature' });
    }
})