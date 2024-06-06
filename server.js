const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');
// const csurf = require('csurf');
// const cookieParser = require('cookie-parser');


const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const csrfProtection = csurf({ cookie: true });
// app.use(cookieParser());
// app.use(csrfProtection);

const todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  completed: Boolean,
  isDisposable: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const todoValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500).required(),
  category: Joi.string().valid('DOM', 'PRACA', 'CZAS WOLNY').required(),
  completed: Joi.boolean().required(),
  isDisposable: Joi.boolean().required()
});

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { error } = todoValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const todo = new Todo({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    completed: req.body.completed,
    isDisposable: req.body.isDisposable
  });

  await todo.save();
  res.status(201).json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.patch('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
