import express from "express";
import { 
    getAllBooks, 
    getsinglebookbyid,
    getBorrowedBooksForUser,
    createBook,
    updateBook, 
    deleteBook,
    getAllBorrowedBooks
} from "../controllers/books-controller.js";
// This file defines the routes for handling book-related operations in the library management system.
// The router is created using Express and exported for use in the main application file.

const router = express.Router();

router.get("/", getAllBooks);
  
router.get("/borrowDate/for-users", getAllBorrowedBooks);

router.get("/:id", getsinglebookbyid);
  
// POST create book
router.post("/", createBook);
// DELETE book by id
router.delete("/:id", deleteBook); 
// PUT update book
router.put("/:id", updateBook);
// GET borrowed books for a user
router.get("/borrowed/:userId", getBorrowedBooksForUser); 
    
export default router;