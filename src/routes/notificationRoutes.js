const express = require("express");
const { sendNotification, savePushToken } = require("../controllers/notificationController");
const notificationRoutes = express.Router();

notificationRoutes.post("/save-token", savePushToken);
notificationRoutes.post("/send/notification", sendNotification);
notificationRoutes.post("/send/notification/:userId", sendNotification);

module.exports = notificationRoutes;
