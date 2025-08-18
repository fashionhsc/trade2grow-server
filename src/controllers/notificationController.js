const { Expo } = require("expo-server-sdk");
const expo = require("../utils/expoPush");
const userModal = require("../models/user");
const ErrorClass = require("../utils/errorClass");
const tryCatch = require("../utils/tryCatch");


exports.savePushToken = tryCatch(async (req, res, next) => {
    let { token, user } = req.body;
    token = token.data ? token.data : (token ? token : null);
    if (!token || !user) return next(new ErrorClass('Invalid request body'));
    const updatedUser = await userModal.findByIdAndUpdate(
        user._id,
        { pushToken: token },
        { new: true }
    );

    if (!updatedUser) return next(new ErrorClass("User not found"));

    res.status(200).json({ success: true, message: "Push token saved successfully", pushToken: updatedUser.pushToken, });

})

exports.sendNotification = tryCatch(async (req, res, next) => {
    const { title, body, data } = req.body;
    const { userId } = req.params;

    let users = [];

    // If userId is passed → send to that single user
    if (userId) {
        const user = await userModal.findById(userId);
        if (!user || !user.pushToken) {
            return next(new ErrorClass("User not found or no push token"));
        }
        users.push(user);
    } else {
        // Otherwise → broadcast to all users
        users = await userModal.find({ pushToken: { $ne: null } });
    }


    let messages = [];
    for (let user of users) {
        if (!Expo.isExpoPushToken(user.pushToken)) continue;
        messages.push({
            to: user.pushToken,
            sound: "default",
            title,
            body,
            data: data || {},
        });
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
    }

    res.json({ success: true, tickets });

})