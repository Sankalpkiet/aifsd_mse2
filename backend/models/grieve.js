const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Academic", "Hostel", "Transport", "Other"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Pending", "Resolved"],
        default: "Pending"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stud",   // 👈 VERY IMPORTANT (matches your model name)
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("grieve", grievanceSchema);