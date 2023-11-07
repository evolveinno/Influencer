const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const User = require("../models/user.model");

const loginOrRegisterUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    try {
      const result = await userService.loginUser(req.body, user);
      res.header("x-auth-token", result.token).send(true);
    } catch (err) {
      res.status(400).send(false);
    }
    return;
  }
  try {
    const result = userService.registerUser(req.body, user);
    res.header("x-auth-token", result.token).send(true);
  } catch {
    res.status(400).send(false);
  }
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  loginOrRegisterUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
