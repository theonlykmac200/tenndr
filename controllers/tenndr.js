const express = require("express")
const tenndrRouter = express.Router()
const session = require("express-session")
const Tenndr = require("../models/tenndr")
const User = require("../models/user")

// index
tenndrRouter.get("/", (req, res) => {
    if(req.session.currentUser) {
    User.findById(req.session.currentUser,(err, foundUser) => {
    res.render("tenndr/dashboard.ejs", {
        tenndr: foundUser.tenndrs,
        currentUser: foundUser,
        user: foundUser,
    });
    });
    } else {
        res.render("tenndr/index.ejs", {
            currentUser: req.session.currentUser,
            });
        } 
    });



// new
tenndrRouter.get("/new", (req, res) => {
    res.render("tenndr/new_workout.ejs", {
        currentUser: req.session.currentUser,
    });
});
//delete
tenndrRouter.delete("/:id", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        foundUser.tenndrs.id(req.params.id).remove();
        foundUser.save((err, data) => {
            res.redirect("/tenndr");
        });
    });
});


//update
tenndrRouter.put("/:id", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
    User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, 
        (err, updatedTenndr) => {
            console.log(updatedTenndr)
        res.redirect("/tenndr");
    });
});
});


 
//create
tenndrRouter.post("/", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        Tenndr.create(req.body, (err, createdTenndr) => {
            foundUser.tenndrs.push(createdTenndr)
            foundUser.save()
            res.redirect("/tenndr")

    })
        
            })
        })



//edit
tenndrRouter.get("/:id/edit", (req, res) => {
        Tenndr.findById(req.params.id, (err, foundTenndr) => {
            res.render("tenndr/edit_workout.ejs", {
                currentUser: req.session.currentUser,
                tenndr: foundTenndr,
            });
            })
        });


//show
tenndrRouter.get("/:id", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        Tenndr.findById(req.params.id, (err, foundTenndr) => {
            res.render("tenndr/show_workout.ejs", { 
                tenndr: foundTenndr,
                currentUser: foundUser,
            })
        })
    })
})


module.exports = tenndrRouter;
