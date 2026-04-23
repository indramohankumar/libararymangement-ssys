import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    publishedDate: {
        type: Date,
    },
    genre: {
        type: String,
    },
    description: {
        type: String,
    },
    availableCopies: {
        type: Number,
        default: 0,
    },
}, { timestamps: true } );

const Book = mongoose.model("Book", bookSchema);
export default Book;