import express from "express";
import usersData from "./data/user.json" with { type: "json" };
import usersrouter from "./routes/users.js";
import booksrouter from "./routes/books.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./databaseconnection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try local project .env first, then parent workspace .env.
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbStatus = await connect();
if (!dbStatus.connected) {
  console.warn("Starting server without database connection.");
}

const { users } = usersData;
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the library management system");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    server: "up",
    database: dbStatus.connected ? "connected" : "disconnected",
    connectionMode: dbStatus.mode,
    reason: dbStatus.reason || null,
  });
});

app.use("/users", usersrouter);
app.use("/books", booksrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Database status: ${dbStatus.connected ? "connected" : "disconnected"} (${dbStatus.mode})`
  );
});