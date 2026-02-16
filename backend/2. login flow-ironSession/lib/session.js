// import { SessionOptions } from "iron-session";
import "dotenv/config"; 

export const sessionOptions= {
  password: process.env.SESSION_SECRET ,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: false, // in Node.js dev, false
  },
};
