const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    private: true,
  },
});

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const validateUser = (user) => {
  const Schema = {
    email: Joi.string().required().min(5).max(50),
    mobile: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
  };
  return Joi.validate(Schema, user);
};
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ email: this.email, _id: _id });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
