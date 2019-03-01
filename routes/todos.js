const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const router = express.Router();

mongoose.connect(
  "mongodb+srv://appservice:apps3rv1c3@cluster0-k3ydo.mongodb.net/newtodos?retryWrites=true",
  { useNewUrlParser: true }
);

const ToDo = mongoose.model("ToDo", {
  title: String,
  completed: Boolean,
  id: String
});

router.get("/", async (req, res, next) => {
  // GET / -> all of the todos in the db
  try {
    const todos = await ToDo.find({});
    res.json({ payload: todos });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res, next) => {
  // POST / -> create a new todo in the db
  const data = {
    title: req.body.title,
    completed: false,
    id: shortid.generate()
  };

  try {
    const todo = new ToDo(data);
    await todo.save();
    res.status(201).json({ message: "All good, created it" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res, next) => {
  // GET /:id -> individual todo with the id given
  try {
    const todo = await ToDo.findOne({ id: req.params.id });
    res.json({ payload: todo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/:id", async (req, res, next) => {
  // GET /:id -> individual todo with the id given
  try {
    await ToDo.update({ id: req.params.id }, { $set: { completed: true } });
    res.json({ message: "Completed" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
