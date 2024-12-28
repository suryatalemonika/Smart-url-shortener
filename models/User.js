const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePhoto: { type: String },
}, { collection: 'users' });

const UserModel = mongoose.model('User', userSchema);

module.exports = {
  UserModel
}
