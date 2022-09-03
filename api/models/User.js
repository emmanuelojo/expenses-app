import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // firstName: {
    //   type: String,
    //   required: false,
    // },
    // lastName: {
    //   type: String,
    //   required: false,
    // },
    // mobileNumber: {
    //   type: String,
    //   required: false,
    // },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static register method

UserSchema.statics.register = async function (username, password) {
  // validation for email and password

  if (!username) {
    throw Error("Username is required");
  }

  if (!password) {
    throw Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hashedPassword,
  });

  return user;
};

UserSchema.statics.login = async function (username, password) {
  // validation for email and password

  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ username });

  if (!exists) {
    throw Error("User not found");
  } else {
    const isPasswordCorrect = await bcrypt.compare(req.body.password, password);

    if (!isPasswordCorrect) throw Error("Wrong password or username!");

    // const user = this.find({email})

    // return user
  }
};

export default mongoose.model("User", UserSchema);
