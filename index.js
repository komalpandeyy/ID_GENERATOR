const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const app = express();

const PORT = 3000;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fname: { type: String, required: true },
  eno: { type: String, unique: true, required: true },
  program: { type: String, required: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true }
});


const User = mongoose.model("students", userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log('Mongo error', err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// GET request to retrieve all users
app.get("/users", async (req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <ul>
        ${allDBusers.map((user) => `<li>${user.name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API to retrieve all users
app.get("/api/users", async (req, res) => {
    const allDBusers = await User.find({});
    return res.json(allDBusers);
});

// GET request to retrieve a user by enrollment number
app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    console.log(`Query: User.find({ eno: ${id} })`);
    try {
        const user = await User.find({ eno: id }).exec();
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// POST route for creating a new user
app.post("/", async (req, res) => {
  const { name, fname, eno, program, dob, address, phone } = req.body;

  const newUser = new User({
      name,
      fname,
      eno,
      program,
      dob,
      address,
      phone,
  });

  try {
      const savedUser = await newUser.save();
      console.log("User saved successfully:", savedUser);
      res.redirect('https://komalpandeyy.github.io/ID_GENERATOR/public/register_successful.html'); // Redirect after successful submission
  } catch (err) {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user");
  }
});

// POST route for fetching student data
app.post("/fetchStudent", async (req, res) => {
  const { rollNo } = req.body;

  try {
      const student = await User.findOne({ eno: rollNo }).exec();
      if (student) {
          // Send the student data as JSON response
          res.status(200).json(student);
      } else {
          // If student with given enrollment number not found
          res.status(404).send("Eno not registered");
      }
  } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
  }
});


// Start server
app.listen(PORT, () => console.log('Server Started at Port', PORT));
