const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        dateTime: {
            type: Date,
            required: [true, "Date and time are required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        creator: {
            type: String,
            required: [true, "Creator name is required"],
            trim: true,
        },
        username:{
            type: String,
            required: [true, "Username is required"],
            trim: true,
        },
        attendeeCount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,  // Adds createdAt and updatedAt fields
        versionKey: false
    }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
