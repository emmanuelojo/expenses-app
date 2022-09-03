import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT, { expiresIn: "3d" });
};

export const register = async (req, res, next) => {
  // const { username, password } = req.body;
  const newUser = new User(req.body);

  if (!req.body.username) {
    res.status(400).json({
      code: 400,
      message: "Failed. Username is required",
      error: "Username is required",
    });
  }

  if (!req.body.password) {
    res.status(400).json({
      code: 400,
      message: "Failed. Password is required",
      error: "Password is required",
    });
  }

  if (!validator.isStrongPassword(req.body.password)) {
    res.status(400).json({
      code: 400,
      message: "Failed. Password not strong enough",
      error: "Password not strong enough",
    });
  }

  const exists = await User.findOne({ username: req.body.username });

  if (exists) {
    res.status(400).json({
      code: 400,
      message: "Failed. Username already exists!",
      error: "Username already exists!",
    });
  }

  try {
    // const user = await User.register(req.body.username, req.body.password);
    // const user = await newUser.save();

    // const { password, ...otherDetails } = user;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // const { password, ...otherDetails } = newUser._doc;
    const { password, ...otherDetails } = savedUser._doc;

    res.status(201).json({
      code: 201,
      data: { ...otherDetails },
      // data: user,
      // data: { ...savedUser._doc },
      // data: newUser,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) throw Error("User not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) throw Error("Wrong password or username!");

    // const token = jwt.sign({ ...user }, process.env.JWT);
    const token = createToken(user._id);

    const { password, ...otherDetails } = user._doc;

    res.status(200).json({
      code: 200,
      data: { ...otherDetails },
      access_token: token,
      message: "Success",
    });
    // res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) throw Error("User not found");

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordCorrect) throw Error("Wrong password or username!");

//     const token = jwt.sign({ ...user }, process.env.JWT);

//     const { password, ...otherDetails } = user._doc;

//     res.status(200).json({
//       code: 200,
//       data: { ...otherDetails },
//       access_token: token,
//       message: "Success",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
