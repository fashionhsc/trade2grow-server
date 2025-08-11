const express = require('express');
const { createOrder, verifyPayment, razorpayWebhook } = require('../../controllers/user/payment');
const userPaymentRoutes = express.Router();


userPaymentRoutes.post('/create-order', createOrder);
userPaymentRoutes.post('/verify-payment', verifyPayment);
userPaymentRoutes.post('/webhook', express.json({ type: '*/*' }), razorpayWebhook);


module.exports = userPaymentRoutes;