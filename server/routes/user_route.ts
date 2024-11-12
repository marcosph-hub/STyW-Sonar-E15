import { Request, Response } from "express";
import User from '../models/user_model';
const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try{
    const user = await User.find();
    res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const new_user = new User(req.body);
    await new_user.save();
    res.status(201).json({
      message: "User created successfully"
  });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "User updated successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error){
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error){
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


module.exports = router;
