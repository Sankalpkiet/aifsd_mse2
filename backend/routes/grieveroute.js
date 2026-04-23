const express = require("express");
const router = express.Router();
const Grievance = require("../models/grieve");
const auth = require("../middleware/middle");

// POST - Submit grievance
router.post("/grievances", auth, async (req, res) => {
    try {
        const grievance = new Grievance({
            ...req.body,
            student: req.user.id
        });

        await grievance.save();
        res.status(201).json(grievance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - All grievances
router.get("/grievances", auth, async (req, res) => {
    try {
        const grievances = await Grievance.find({ student: req.user.id });
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/grievances/search", auth, async (req, res) => {
    try {
        const { title } = req.query;
        const results = await Grievance.find({
            title: { $regex: title, $options: "i" }
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET by ID
router.get("/grievances/:id", auth, async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);
        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put("/grievances/:id", auth, async (req, res) => {
    try {
        const updated = await Grievance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/grievances/:id", auth, async (req, res) => {
    try {
        await Grievance.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;