import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

router.get("/", async (req: Request, res: Response) => {
  const user = await User.find();
  res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const new_user = new User(req.body);
  await new_user.save();
  res.json({
    message: "User created successfully",
    status: 201
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "User updated successfully",
    status: 201
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({
    message: "User deleted successfully",
    status: 201
  });
});


module.exports = router;
