import mongoose from "mongoose";
import {config} from './config'
const connectDB = async () => {
    try
    {
      await mongoose.connect(config.databaseUrl as string)
      console.log("Connected to database")
    }
    catch(error)
    {
      console.log("Failed to connect to database",error)
    }
}
export default connectDB

