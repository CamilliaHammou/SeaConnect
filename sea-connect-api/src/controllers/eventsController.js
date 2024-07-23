import Event from "../models/event.js";

const getActiveEvents = async (req, res) => {
  try {
    const activeEvents = await Event.getActiveEvents();
    res.status(200).json({ message: "Events retrieved successfully", success: true, data: activeEvents });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Events", success: false, error: err.message });
  }
}

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.getAllEvents();
    res.status(200).json({ message: "Events retrieved successfully", success: true, data: allEvents });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Events", success: false, error: err.message });
  }
}

const createEvent = async (req, res) => {
  const currentUser = req.user;
  const body = req.body;

  if (!body.title || !body.eventDate || !body.location || !body.registrationFee) { 
    return res.status(400).json({ message: "Title, Event Date, Location and Registration Fee are required", success: false });
  }

  const data = {
    title: body.title,
    description: body?.description,
    eventDate: body.eventDate,
    eventDateFin: body.eventDateFin,
    location: body.location,
    organizerId: currentUser.id,
    organizerEmail: currentUser.email,
    registrationFee: body.registrationFee,
  };
  
  try {
    const event = await Event.createEvent(data);
    res.status(201).json({ message: "Event created successfully", success: true, data: event });
  } catch (err) {
    res.status(500).json({ message: "Error creating Event", success: false, error: err.message });
  }
};


const updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const data = {};

  if (req.body.title) data.title = req.body.title;
  if (req.body.description) data.description = req.body.description;
  if (req.body.eventDate) data.eventDate = req.body.eventDate;
  if (req.body.eventDateFin) data.eventDateFin = req.body.eventDateFin;
  if (req.body.location) data.location = req.body.location;
  if (req.body.registrationFee) data.registrationFee = req.body.registrationFee;
  
  try {
    const updatedEvent = await Event.updateEvent(eventId, data);
    res.status(200).json({ message: "Event updated successfully", success: true, data: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Error updating Event", success: false, error: err.message });
  }
};


const deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    await Event.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Event", success: false, error: err.message });
  }
}

const registerEvent = async(req, res) => {
  const currentUser = req.user;

  if (!req.body.eventId) {
    return res.status(400).json({ message: "Event ID is required", success: false });
  }

  try {
    const event = await Event.registerEvent(currentUser, req.body.eventId);
    res.status(200).json({ message: "Event registered successfully", success: true, data: event });
  } catch (err) {
    res.status(500).json({ message: "Error registering Event", success: false, error: err.message });
  }
}

export { getAllEvents, getActiveEvents, createEvent, updateEvent, deleteEvent, registerEvent};
