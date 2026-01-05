import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOSTNAME}.mongodb.net/?appName=${process.env.MONGODB_APPNAME}`;

async function connectToDB() {
  try {
    await mongoose.connect(uri);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error in dbconnect.ts: ", error);
    process.exit(1);
  }
}

export default connectToDB;
