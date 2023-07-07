import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, address, zipcode, state, city } = req.body;

  const userExists = await User.findOne({ email });

  // Validation Checks
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (zipcode.length !== 5) {
    res.status(400);
    throw new Error("Zipcode must be exactly 5 characters long");
  }

  if (password.length <= 8) {
    res.status(400);
    throw new Error("Password must be longer than 8 characters");
  }

  const user = await User.create({
    username,
    email,
    password,
    address,
    zipcode,
    state,
    city,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      address: req.user.address,
      zipcode: req.user.zipcode,
      state: req.user.state,
      city: req.user.city,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;

    // Validation Checks
    if (req.body.zipcode) {
      if (req.body.zipcode.length !== 5) {
        res.status(400);
        throw new Error("Zipcode must be exactly 5 characters long");
      } else {
        user.zipcode = req.body.zipcode || user.zipcode;
      }
    }

    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;

    // Validation Checks
    if (req.body.password) {
      if (req.body.password.length <= 8) {
        res.status(400);
        throw new Error("Password must be longer than 8 characters");
      } else {
        user.password = req.body.password;
      }
    }

    const updateUser = await user.save();

    res.status(201).json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      address: updateUser.address,
      zipcode: updateUser.zipcode,
      state: updateUser.state,
      city: updateUser.city,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
