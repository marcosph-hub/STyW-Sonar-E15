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

// FIXME:analizar si name password y role son necesarios
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email alrady registered' });
    }
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

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);
    const reqUser = await User.findOne({ email });
    console.log(reqUser?.email);
    if (reqUser?.email !== email) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Login exitoso'
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
