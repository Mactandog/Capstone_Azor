const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Static Sign Up Method
userSchema.statics.signup = async function (
  first_name,
  last_name,
  email,
  password
) {
  const exists = await this.findOne({ email });

  // validation
  if (!first_name) {
    throw Error("First name is required!");
  }
  if (!last_name) {
    throw Error("Last name is required!");
  }
  if (!email) {
    throw Error("Email is required!");
  }
  if (!password) {
    throw Error("Password is required!");
  }

  if (exists) {
    throw Error("Email already in use!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    first_name,
    last_name,
    email,
    password: hash,
  });
  return user;
};

// Static login Method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email) {
    throw Error("Email is required!");
  }
  if (!password) {
    throw Error("Password is required!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
