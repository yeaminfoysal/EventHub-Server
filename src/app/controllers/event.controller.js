const express = require("express");
const Event = require("../models/event.model");

const eventRoutes = express.Router();

eventRoutes.post("/", async (req, res) => {
    // try {
    //     const event = req.body;
    //     const book = await Event.create(body);
    //     res.status(201).json({
    //         success: true,
    //         message: "Book created successfully",
    //         data: book,
    //     });
    // } catch (error) {
    //     res.status(400).json({
    //         success: false,
    //         message: "Validation failed",
    //         error,
    //     });
    // }
});

eventRoutes.get("/", async (req, res) => {
    // try {
    //     const books = await Book.find(); // <-- added missing logic
    //     res.status(200).json({
    //         success: true,
    //         message: "Books retrieved successfully",
    //         data: books,
    //     });
    // } catch (error) {
    //     res.status(400).json({
    //         success: false,
    //         message: "Validation failed",
    //         error,
    //     });
    // }
});

eventRoutes.get("/:bookId", async (req, res) => {
    // try {
    //     const bookId = req.params.bookId;
    //     const book = await Book.findById(bookId);

    //     res.status(200).json({
    //         success: true,
    //         message: "Book retrieved successfully",
    //         data: book,
    //     });
    // } catch (error) {
    //     res.status(404).json({
    //         success: false,
    //         message: "Book not found",
    //         error,
    //     });
    // }
});

eventRoutes.patch("/:bookId", async (req, res) => {
    // try {
    //     const bookId = req.params.bookId;
    //     const updatedBook = req.body;
    //     const book = await Book.findByIdAndUpdate(bookId, updatedBook, {
    //         new: true,
    //     });

    //     res.status(201).json({
    //         success: true,
    //         message: "Book updated successfully",
    //         data: book,
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Failed to update book",
    //         error,
    //     });
    // }
});

eventRoutes.delete("/:bookId", async (req, res) => {
    // try {
    //     const bookId = req.params.bookId;
    //     const deletedBook = await Book.findOneAndDelete({ _id: bookId });
    //     if (!deletedBook) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "Book not found",
    //             data: null,
    //         });
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: "Book deleted successfully",
    //         data: null,
    //     });
    // } catch (error) {
    //     res.status(404).json({
    //         success: false,
    //         message: "Book not found",
    //         error,
    //     });
    // }
});

module.exports = { eventRoutes };
