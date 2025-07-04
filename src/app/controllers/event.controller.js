const express = require("express");
const Event = require("../models/event.model");

const eventRoutes = express.Router();

eventRoutes.post("/", async (req, res) => {
    try {
        const data = req.body;
        const event = await Event.create(data)
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
});

eventRoutes.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ dateTime: 1 }); // <-- added missing logic
        res.status(200).json({
            success: true,
            message: "Events retrieved successfully",
            data: events,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
});

eventRoutes.get("/my/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const events = await Event.find({ username });

        res.status(200).json({
            success: true,
            message: "Events retrieved successfully",
            data: events,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Event not found",
            error,
        });
    }
});

eventRoutes.patch("/join/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $inc: { attendeeCount: 1 } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Joined event successfully',
            data: updatedEvent,
        });
    } catch (error) {
        console.error('Join event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to join event',
            error: error.message,
        });
    }
});

eventRoutes.patch("/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const updatedBody = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedBody, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent,
        });
    } catch (error) {
        console.error('Join event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to join event',
            error: error.message,
        });
    }
});

eventRoutes.delete("/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        console.log(req.params.eventId);
        const deletedEvent = await Event.findOneAndDelete({ _id: eventId });
        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error,
        });
    }
});

module.exports = { eventRoutes };
