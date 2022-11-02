const express = require("express")
const app = express()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const tenndrController = require("./controllers/tenndr")

require("dotenv").config()
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

//middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use("/", tenndrController)
app.use(express.static("public"))


app.listen(PORT, () => {
    console.log("Stay Sexy Don't Get Murdered!")
})