const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos', {useUnifiedTopology: true, useNewUrlParser: true});

const TodoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
