import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectToDB = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      mongoose.Promise = Promise;
      await mongoose.connect(MONGO_URL);
      console.log("Connected to the database");
      resolve();
    } catch (error) {
      mongoose.connection.on("error", (err) => {
        console.log("Mongoose default connection error: " + err);
        reject();
      });
    }
  });
};
