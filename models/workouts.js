const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    exercise: [{
        name: {
            type: String,
            required: "Enter a name for the exercise."
        },
        type: {
            type: String,
            required: "Enter the type of exercise."
        },
        weight: {
            type: String,
            required: "Enter a name for the exercise."
        },
        reps: {
            type: String,
            required: "Enter a name for the exercise."
        },
        sets: {
            type: String,
            required: "Enter a name for the exercise."
        },
        duration: Number,
        distance: {
            type: String,
            required: "Enter a name for the exercise."
        }
    }]
});

const Workouts = mongoose.model("Workouts", workoutSchema);

module.exports = Workouts;