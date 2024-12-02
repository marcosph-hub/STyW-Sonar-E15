import { Request, Response } from "express";
import StudyMethodModel from "../models/studyMethodModel";
import UserPreferencesModel from "../models/userPreferencesModel";
import User from "../models/user_model";
import mongoose from "mongoose";

const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const studyMethods = await StudyMethodModel.find();
        res.status(200).json(studyMethods);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        const newMethod = new StudyMethodModel({ name, description });
        const savedMethod = await newMethod.save();
        res.status(201).json(savedMethod);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});

router.get("/preferences/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const preferences = await UserPreferencesModel.findOne({ userId })
            .populate('userId')
            .populate('methodId');
        
        if (!preferences) {
            return res.status(404).json({ error: 'Preferencias no encontradas' });
        }
        res.status(200).json(preferences);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});

router.post("/preferences", async (req: Request, res: Response) => {
    try {
        const { userId, methodId, customSettings } = req.body;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const methodExists = await StudyMethodModel.findById(methodId);
        if (!methodExists) {
            return res.status(404).json({ error: 'Método de estudio no encontrado' });
        }

        const newPreferences = new UserPreferencesModel({
            userId,
            methodId,
            customSettings
        });

        const savedPreferences = await newPreferences.save();
        
        const populatedPreferences = await UserPreferencesModel.findById(savedPreferences._id)
            .populate('userId')
            .populate('methodId');

        res.status(201).json(populatedPreferences);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});

export default router;

