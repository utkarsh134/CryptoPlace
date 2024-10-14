import { Router } from "express";
import {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
  handleIsLoggedIn,
} from "../controllers/user.controllers.js";

const router = Router();

// USER Controller Routes.
router.route("/signup").post(handleUserSignup);
router.route("/signin").post(handleUserSignin);
router.route("/isLoggedIn").get(handleIsLoggedIn);
router.route("/logout").post(handleUserLogout);

export default router;
