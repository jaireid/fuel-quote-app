import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      minLength: 5,
      maxLength: 5,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    quotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware for encryption
userSchema.pre("save", async function (next) {
  // If user password is not changed move on
  if (!this.isModified("password")) {
    next();
  }

  // If password is modified hash it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Verify entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
