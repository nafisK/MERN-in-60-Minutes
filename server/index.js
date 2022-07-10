const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const UserModel = require("./models/Users")

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://user123:pass123!@cluster0.41r4tbi.mongodb.net/merntutorial?retryWrites=true&w=majority"
)

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.json(err)
    } else {
      res.json(users)
    }
  })
})

app.post("/createUser", async (req, res) => {
  const user = req.body
  const newUser = new UserModel(user)
  await newUser.save((err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
})

app.listen(3001, () => {
  "Server is running on port 3000.."
})
