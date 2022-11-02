const mongoose = require("mongoose")

const tenndrSchema = new mongoose.Schema({
    workout: { type: String, required: true},
    description: {type: String, required: false},
    duration: {type: Number, require: true},
    difficulty: {type: String, require: true},
    mood_before: {type: String, require: false},
    mood_after: {type: String, require: false},
    day_of_week: {type: String, require: true},
    time_of_day: {type: String, require: true},
})

const Tenndr = mongoose.model("tenndr", tenndrSchema)

module.exports= Tenndr