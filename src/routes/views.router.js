import express from "express";
import { renderBookings, renderServices } from "../controllers/views.controller.js";

const router = express.Router();

router.get("/services", renderServices);
router.get("/bookings", renderBookings);

export default router;
