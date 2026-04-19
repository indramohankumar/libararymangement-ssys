import express from "express";
import booksData from "../data/books.json" with { type: "json" };
import usersData from "../data/user.json" with { type: "json" };


const router = express.Router();
const { books } = booksData;
const { users } = usersData;

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books
  });
});

router.get("/borrowDate/for-users", (req, res) => {
    const userswithborrowedBooks = users.filter((each) => {
        if (Array.isArray(each.borrowedBooks) && each.borrowedBooks.length > 0) {
            return each;
        }
    });

    const borrowedBooks = [];
    userswithborrowedBooks.forEach((each) => {
        each.borrowedBooks.forEach((borrowedBook) => {
            const book = books.find((book) => book.id === borrowedBook.bookId);

            borrowedBooks.push({
                ...borrowedBook,
                borrowedby: each.name,
                userId: each.id,
                catalogBook: book || null
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
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === parseInt(id));
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }
  res.status(200).json({
    success: true,
      data: book
    });
  });
// POST create book
router.post("/",(req,res)=>{
    const {id,title,author}=req.body;
    if(!id||!title||!author){
        return res.status(400).json({
            success:false,
            message:"Please provide id, title and author"
        })
    }
    const book=books.find(each=>each.id===id);
    if(book){
        return res.status(400).json({
            success:false,
            message:`Book with this id already exists: ${id}`
        })
    }
    books.push({id,title,author});
    res.status(201).json({
        success:true,
        message:"Book created successfully",
        data:{id,title,author}
    });
});
// DELETE book by id
router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const bookIndex=books.findIndex(each=>each.id===parseInt(id));
    if(bookIndex===-1){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    books.splice(bookIndex,1);
    res.status(200).json({
        success:true,
        message:"Book deleted successfully"
    });
});
// PUT update book
router.put("/:id",(req,res)=>{
    const {id}=req.params;  
    const {title,author}=req.body;
    const book=books.find(each=>each.id===parseInt(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    const updatedBooks=books.map(each=>{
        if(each.id===parseInt(id)){
            return {...each,...req.body};
        }
        return each;
    });
    res.status(200).json({
        success:true,
        message:"Book updated successfully",
        data:updatedBooks
    });
});
// GET borrowed books for a user
router.get("/borrowed/:userId", (req, res) => {
    const { userId } = req.params;
    const user = users.find((each) => each.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const borrowedBooks = user.borrowedBooks.map((borrowedBook) => {
        const book = books.find((each) => each.id === borrowedBook.bookId);
        return {
            ...borrowedBook,
            catalogBook: book || null
        };
    });
    res.status(200).json({
        success: true,
        data: borrowedBooks
    });
});

export default router;