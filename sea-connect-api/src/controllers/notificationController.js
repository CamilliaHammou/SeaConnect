import Notification from "../models/notification.js";

const createNotification = async (req, res) => {
  const body = req.body;
  if (!body.title || !body.notiificationType) {
    return res.status(400).json({ message: "Fields are missing", success: false });
  }

  const data = {
    userId: req.user.id,
    userEmail: req.user.email,
    title: body.title,
    description: body.description,
    notiificationType: body.notiificationType.toUpperCase(),
  };

  try {
    const notification = await Notification.createNotification(data);
    res.status(201).json({ message: "Notification created successfully", success: true, data: notification });
  } catch (err) {
    res.status(500).json({ message: "Error creating notification", success: false, error: err.message });
  }
}

const markRead = async (req, res) => {
  if (!req.body.notificationId) { return res.status(400).json({ message: "Fields are missing", success: false }); }

  try {
    const notification = await Notification.markRead(req.body.notificationId, req.user);
    res.status(200).json({ message: "Notification marked as read", success: true, data: notification });
  } catch (err) {
    res.status(500).json({ message: "Error marking notification as read", success: false, error: err.message });
  }
}

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getNotifications(req.user);
    res.status(200).json({ message: "Notifications fetched", success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", success: false, error: err.message });
  }
}



export { createNotification, markRead, getNotifications };
