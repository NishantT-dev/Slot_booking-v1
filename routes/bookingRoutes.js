import express from "express";
import {
  getSlotsController,
  bookSlotController,
  cancelBookingController,
  rescheduleBookingController,
} from "../controllers/bookingController.js";

const router = express.Router();

//  Slot booking routes
router.get("/slots", getSlotsController);
router.post("/book", bookSlotController);
router.post("/cancel", cancelBookingController);
router.post("/reschedule", rescheduleBookingController);

export default router;
