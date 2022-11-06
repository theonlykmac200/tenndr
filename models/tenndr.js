const mongoose = require("mongoose")

const tenndrSchema = new mongoose.Schema({
    workout: { type: String,required: true},
    sets: { type: Number, required: true},
    reps: { type: Number, required: true},
    description: {type: String, required: false},
    duration_in_mins: {type: Number, require: true},
    difficulty: {type: String, require: true},
    mood_before: {type: String, require: false},
    mood_after: {type: String, require: false},
   },
    {
    timestamps: true
    }
)

const Tenndr = mongoose.model("tenndr", tenndrSchema)

module.exports= Tenndr