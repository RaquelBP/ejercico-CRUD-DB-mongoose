// users.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 

//CREAR TAREA
router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});


//GET TODAS LAS TAREAS
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get tasks" });
    }
});


// Obtener una tarea por ID
router.get("/id/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the task" });
    }
});

// MARK AS COMPETE
router.put("/markAsCompleted/:id", async (req, res) => {
    try {
        const { completed } = req.body;
        if (typeof completed === 'undefined') {
            return res.status(400).send({ message: "Completed field is required" });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the task" });
    }
});

// Actualizar una tarea por ID
router.put("/id/:id", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Title field is required" });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the task" });
    }
});

// Eliminar una tarea por ID
router.delete("/id/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete the task" });
    }
});

module.exports = router;