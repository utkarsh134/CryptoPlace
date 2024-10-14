import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./db/index.js";

import userRouter from "./routes/user.routes.js";
import coinRouter from "./routes/coins.routes.js";
import contactRouter from "./routes/contact.routes.js";
import { checkForAuthenticationCookie } from "./middlewares/auth.middleware.js";
// import Stripe from "stripe";
// const stripe = new Stripe("sk_test_..."); // Stripe secret Key.

dotenv.config({
  path: "./.env",
});

const app = express();

//
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connectMongoDB();

// Middlewares to parse incoming data from the frontend.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
// app.use(checkForAuthenticationCookie("accessToken"));

// Routes
app.use("/user", userRouter);
app.use("/api/coins", coinRouter);
app.use("/contact", contactRouter) ;

// Need to handle Payment, but i didn't get secret key from Stripe uptill now.
// app.post("/create-checkout-session", async (res, res) => {
//   const { title, price, offers, plan } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     title,
//     plan,
//     price: Math.round(price),
//     offers,
//     success_url: "",
//     cancel_url: "",
//   });

//   res.json({ id: session.id });
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
