import { Router } from "express";
import { handleSendSMS } from "../controllers/contact.controllers.js";
const router = Router();

router.post("/send-sms", handleSendSMS) ;

export default router;