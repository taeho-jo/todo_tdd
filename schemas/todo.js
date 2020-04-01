const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos', {useUnifiedTopology: true, useNewUrlParser: true});

const TodoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  done: Boolean
});
TodoSchema.methods.isNotDone = function () {
  return !this.done;
}
module.exports = mongoose.model('Todo', TodoSchema);
