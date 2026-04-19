import express from "express";
import usersData from "./data/user.json" with { type: "json" };
import usersrouter from "./routes/users.js";
import booksrouter from "./routes/books.js";

const { users } = usersData;
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the library management system");
});

app.use("/users", usersrouter);
app.use("/books", booksrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});