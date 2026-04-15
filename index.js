import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the library management system");
}   
);
// app.all(/.*/, (req, res) => {
//   res.status(404).send("Page not found");
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});