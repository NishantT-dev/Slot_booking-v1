import * as bookingService from "../services/bookingService.js";

export const getSlotsController = async (req, res, next) => {
  try {
    const slots = await bookingService.getSlots();
    res.json(slots);
  } catch (err) {
    next(err);
  }
};

export const bookSlotController = async (req, res, next) => {
  try {
    const { userId, slotId } = req.body;
    const result = await bookingService.bookSlot(slotId, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const cancelBookingController = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const result = await bookingService.cancelBooking(bookingId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const rescheduleBookingController = async (req, res, next) => {
  try {
    const { bookingId, newSlotId } = req.body;
    const result = await bookingService.rescheduleBooking(bookingId, newSlotId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
