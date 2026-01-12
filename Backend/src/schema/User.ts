import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schemaSkeleton = {
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  nativeLanguage: {
    type: String,
    default: "",
  },
  learningLanguage: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
};

interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  isOnboarded: boolean;
  friends: mongoose.Schema.Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema(schemaSkeleton, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    console.log("An error occured while hashing a password!", error);
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return (await bcrypt.compare(password, this.password)) as boolean;
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
