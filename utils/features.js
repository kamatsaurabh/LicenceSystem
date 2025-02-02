import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI || "";

export const connectDB = () => {
    mongoose
      .connect(mongoURI, {
        dbName: "LicenceSystem",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };