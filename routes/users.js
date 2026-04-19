import express from "express";
import usersData from "../data/user.json" with { type: "json" };

const router = express.Router();
const { users } = usersData;

// GET all users
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});

// GET user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// POST create user
router.post("/", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({
      success: false,
      message: "Please provide id, name and email"
    });
  }

  const User = users.find((each) => each.id === id);

  if (User) {
    return res.status(400).json({
      success: false,
      message: `User with this id already exists: ${id}`
    });
  }

  users.push({ id, name, email });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { id, name, email }
  });
});

// PUT update user
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const updatedUsers = users.map((each) => {
    if (each.id === parseInt(id)) {
      return { ...each, ...req.body };
    }
    return each;
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUsers
  });
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const updatedUsers = users.filter((each) => each.id !== parseInt(id));

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: updatedUsers
  });
});


export default router;