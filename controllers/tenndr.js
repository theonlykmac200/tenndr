const express = require("express")
const tenndrRouter = express.Router()
const Tenndr = require("../models/tenndr")

// index
tenndrRouter.get("/", (req, res) => {
    Tenndr.find({}, (err, foundTenndr) => {
    res.render("index_workouts.ejs", {
        tenndr: foundTenndr})
    })
})

// new
tenndrRouter.get("/new", (req, res) => {
    res.render("new_workout.ejs")
})
//delete
tenndrRouter.delete("/:id", (req, res) => {
    Tenndr.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
        res.redirect("/tenndr")
    })
})


//update
tenndrRouter.put("/:id", (req, res) => {
    Tenndr.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedWorkout) => {
            res.redirect(`/tenndr/${req.params.id}`)
        }
    )
})

//create
tenndrRouter.post("/", (req, res) => {
    Tenndr.create(req.body, (err, createdWorkout) => {
        res.redirect("/tenndr")
    
    })
})

//edit
tenndrRouter.get("/:id/edit", (req, res) => {
    res.send("I'll stare directly in the sun")
})

//show
tenndrRouter.get("/:id", (req, res) => {
    Tenndr.findById(req.params.id, (err, foundWorkout) => {
    res.render("show_workout.ejs", {tenndr: foundWorkout})
})
})

module.exports = tenndrRouter;