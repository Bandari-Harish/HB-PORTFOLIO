import mongoose  from "mongoose";
import {connectDatabase} from "../config/database.js";
import Admin  from "../models/Admin.js"
import dotenv from "dotenv";

import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
await connectDatabase();

const existingAdmin = await Admin.findOne();
if (existingAdmin) {
  console.log("Admin already exists.");

  await mongoose.connection.close();

  process.exit(0);
}

const adminData = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

await Admin.create(adminData);

console.log("Admin created successfully.");

await mongoose.connection.close();