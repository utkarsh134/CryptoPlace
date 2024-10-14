import { Router } from "express";
import {
  handleGetAllCoins,
  handleGetHistoricalCoinData,
} from "../controllers/coins.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/:currency").get(handleGetAllCoins);
router
  .route("/historical-data/:coin/:currency")
  .get(verifyJWT, handleGetHistoricalCoinData);

export default router;
