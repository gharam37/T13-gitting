const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

// --------------------------- methods ---------------------------

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);
