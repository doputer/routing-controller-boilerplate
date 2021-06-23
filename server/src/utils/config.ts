import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import nodemailer from "nodemailer";

dotenv.config();

export const configs = {
  port: process.env.PORT || 3000,
};

export const ormconfigs: ConnectionOptions = {
  type: "mysql",
  host: process.env.HOST || "localhost",
  port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 3306,
  username: "root",
  password: process.env.PASSWORD || "root",
  database: process.env.DATABASE || "toy",
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/../entities/*.{ts,js}`],
};

export const emailConfigs = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
