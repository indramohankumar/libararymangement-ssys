import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user-controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// GET user by id
router.get("/:id", getUserById);

// POST create user
router.post("/", createUser);

// PUT update user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

export default router;