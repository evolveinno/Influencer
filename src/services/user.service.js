const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const validateUser = require("../models/user.model");
const registerUser = async (userBody) => {
  const { error } = validateUser(userBody);
  console.log("inservices");
  if (error) {
    return error.details[0].message;
  }

  try {
    const { password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    const user = new User(user);
    const result = user.save();
    const userFromDB = await User.findOne({ email: userBody.email });

    const token = userFromDB.generateToken();
    return {
      user: result,
      token,
    };
  } catch (err) {
    return new Error("user not registered properly");
  }
};

const loginUser = async (userBody, userInDB) => {
  const { password } = userBody;
  const compare = await bcrypt.compare(password, userInDB.password);
  if (compare) {
    const user = await User.findOne({ email: userBody.email });
    const token = user.generateToken();
    return {
      user: userBody,
      token,
    };
  } else {
    return new Error("Password entered by the user is Incorrect");
  }
};
module.exports = {
  registerUser,
  loginUser,
};
