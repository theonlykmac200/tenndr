const express = require("express")
const tenndrRouter = express.Router()
const Tenndr = require("../models/tenndr")

// index
tenndrRouter.get("/", (req, res) => {
    res.render("index.ejs")
})
// new
tenndrRouter.get("/new", (req, res) => {
    res.render("new.ejs")
})
//delete
tenndrRouter.delete("/:id", (req, res) => {
    Tenndr.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
        res.redirect("/tenndr")
        console.log(err)
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
    res.send("At tea time everyone agrees")
})

module.exports = tenndrRouter;