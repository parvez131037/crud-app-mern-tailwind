const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set('strictQuery', false)
const PORT = process.env.PORT || 8000;

const { User } = require("./models/model");

const app = express();

app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

app.get("/users/single/:id", async (req, res) => {
  const { id } = req.params;
  const singleUser = await User.findById(id);
  return res.status(200).json(singleUser);
});

app.post("/users", async (req, res) => {
  const newUser = new User({ ...req.body });
  const insertedUser = await newUser.save();
  return res.status(201).json(insertedUser);
});

// app.put("/users/update/:id", async (req, res) => {
//   const { id } = req.params;
//   await User.updateOne({ id }, req.body);
//   const updatedUser = await User.findById(id);
//   return res.status(200).json(updatedUser);
// });

app.put("/users/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.send(updatedUser);
  } catch (err) {
    console.log("~ err", err);
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  return res.status(200).json(deletedUser);
});

// Connect to DATABASE
const DATABASE_URL = "mongodb://0.0.0.0/users";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))


//app.listen() function which Binds and listens for connections on the specified host and port.
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))