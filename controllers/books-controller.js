import { Book, User } from "../data/models/index.js";
import BookDTO from "../dto/book-dto.js";

export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    const booksDto = books.map((book) => new BookDTO(book));

    if (!books.length) {
        return res.status(404).json({
            success: false,
            message: "No books found"
        });
    }

    res.status(200).json({
        success: true,
        data: booksDto
    });
};

export const getsinglebookbyid = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    res.status(200).json({
        success: true,
        data: new BookDTO(book)
    });
};
export const getBorrowedBooksForUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("issuedBooks");
    const issuedBooks = user.issuedBooks.map((book) => new BookDTO(book));
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
};
export const createBook = async (req, res) => {
    const { data } = req.body;
    if (!data.title || !data.author || !data.isbn) {
        return res.status(400).json({
            success: false,
            message: "Title, author, and isbn are required"
        });
    }
    const existingBook = await Book.findOne({ isbn: data.isbn });
    if (existingBook) {
        return res.status(400).json({
            success: false,
            message: "Book with this isbn already exists"
        });
    }
    const book = await Book.create({ ...data });
    res.status(201).json({
        success: true,
        data: new BookDTO(book)
    });
};
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    if (data.title) book.title = data.title;
    if (data.author) book.author = data.author;
    await book.save();
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: new BookDTO(book)
    });
};
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    await book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
};

export const getAllBorrowedBooks = async (req, res) => {
    try {
        const users = await User.find({ issuedBooks: { $exists: true, $not: { $size: 0 } } }).populate("issuedBooks");
        
        const borrowedBooks = [];
        users.forEach((each) => {
            each.issuedBooks.forEach((book) => {
                borrowedBooks.push({
                    borrowedby: each.name,
                    userId: each._id,
                    catalogBook: new BookDTO(book)
                });
            });
        });

        if (!borrowedBooks.length) {
            return res.status(404).json({
                success: false,
                message: "No borrowed books found"
            });
        }

        res.status(200).json({
            success: true,
            data: borrowedBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
