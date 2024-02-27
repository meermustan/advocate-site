import { emitNotification } from "../../app.js";
import { Job, Notification, Log } from "../../models/index.js";
import { errorHelper, logger, getText } from "../../utils/index.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import axios from 'axios';
import createZoomMeeting from "../controllers/createZoomMeeting/createZoomMeeting.js";
// import { ZoomMtg } from '@zoomus/websdk';
import User from "../../models/user.js";

const sendNotification = async (notification, emit = true) => {
  let newNotification = new Notification(notification);
  newNotification = await newNotification.save().catch((err) => {
    console.log("@sendNotification", err);
  });
  if (emit) emitNotification(newNotification._doc);
};

const unseenNotification = async (req, res) => {
  let unSeenCount = await Notification.count({
    user: req.user._id,
    isSeen: false,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  return res.status(200).json({
    unSeenCount,
  });
};

const getMyNotification = async (req, res) => {
  let myNotifications = await Notification.find({ user: req.user._id }).catch(
    (err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    }
  );
  return res.status(200).json({
    myNotifications,
  });
};

const updateNotification = async (req, res) => {
  await Notification.updateMany({ user: req.user._id }, { isSeen: true }).catch(
    (err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    }
  );
  return res.status(200).json({});
};

const updateNotificationStatus = async (req, res) => {
  console.log(req.query.noteId);
  await Notification.findByIdAndUpdate(req.query.noteId, {
    isRead: true,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  return res.status(200).json({});
};

const createEvent = async (req, res) => {
  
  const userType = req.user.type;
  const { job, event, user, startTime } = req.body;
  let foundJob = await Job.findById(job).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  // Convert scheduled time to Zoom's required format (e.g., '2023-01-01T12:00:00Z')
  const formattedStartTime = new Date(event.start).toISOString();
  let createMeeting;
  createMeeting = await createZoomMeeting(event.title, event.duration, formattedStartTime);

  let newEvent = {
    _id: new ObjectId(),
    duration: event.duration,
    title: event.title,
    start: event.start,
    end: event.end,
    type: userType,
    status: `Created by ${userType}`,
    meeting_url: createMeeting.meeting_url,
  };

  
  await foundJob.events.push(newEvent);

  await foundJob.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  const notification = {
    title: "New Meeting Event",
    description: `Your ${userType} creating new meeting in <b> ${foundJob.title} </b>`,
    job: job,
    user: user,
    type: userType,
  };

  res.status(200).json({
    resultMessage: { en: getText("en", "00203"), ur: getText("ur", "00203") },
    resultCode: "00203",
  });

  sendNotification(notification);
};

const getLogs = async (req, res) => {
  let logs = await Log.find().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  return res.status(200).json(logs);
};

const DeleteLogs = async (req, res) => {
  await Log.deleteMany().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  return res.status(200).json({});
};

export {
  createEvent,
  sendNotification,
  updateNotification,
  getMyNotification,
  unseenNotification,
  updateNotificationStatus,
  getLogs,
  DeleteLogs,
};
