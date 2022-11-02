const express = require("express")
const tenndrRouter = express.Router()
const Tenndr = require("../models/tenndr")


tenndrRouter.get("/", (req, res) => {
    res.send("hi, its me")
})


module.exports = tenndrRouter;