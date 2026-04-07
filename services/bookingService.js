import pool from "../config/db.js";

// Get available slots
export const getSlots = async () => {
  const [rows] = await pool.query("SELECT * FROM slots WHERE available > 0");
  return rows;
};

// Book slot
export const bookSlot = async (slotId, userId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [slot] = await connection.query(
      "SELECT * FROM slots WHERE id=? FOR UPDATE",
      [slotId],
    );
    if (slot.length === 0) throw new Error("Slot not found");

    const slotDate = new Date(slot[0].slot_date);
    if (slotDate < new Date()) throw new Error("Cannot book past slot");
    if (slot[0].available <= 0) throw new Error("Slot full");

    const [existing] = await connection.query(
      "SELECT * FROM bookings WHERE user_id=? AND slot_id=? AND status='confirmed'",
      [userId, slotId],
    );
    if (existing.length > 0) throw new Error("User already booked this slot");

    await connection.query(
      "INSERT INTO bookings (user_id,slot_id) VALUES (?,?)",
      [userId, slotId],
    );
    await connection.query(
      "UPDATE slots SET available = available - 1 WHERE id=?",
      [slotId],
    );

    await connection.commit();
    return { message: "Slot booked successfully" };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [booking] = await connection.query(
      "SELECT * FROM bookings WHERE id=? FOR UPDATE",
      [bookingId],
    );
    if (booking.length === 0) throw new Error("Booking not found");
    if (booking[0].status === "cancelled")
      throw new Error("Booking already cancelled");

    const slotId = booking[0].slot_id;

    await connection.query(
      "UPDATE bookings SET status='cancelled' WHERE id=?",
      [bookingId],
    );
    await connection.query(
      "UPDATE slots SET available = available + 1 WHERE id=?",
      [slotId],
    );

    await connection.commit();
    return { message: "Booking cancelled" };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// Reschedule booking
export const rescheduleBooking = async (bookingId, newSlotId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [booking] = await connection.query(
      "SELECT * FROM bookings WHERE id=? FOR UPDATE",
      [bookingId],
    );
    if (booking.length === 0) throw new Error("Booking not found");

    const oldSlotId = booking[0].slot_id;

    const [newSlot] = await connection.query(
      "SELECT * FROM slots WHERE id=? FOR UPDATE",
      [newSlotId],
    );
    if (newSlot[0].available <= 0) throw new Error("New slot full");

    await connection.query("UPDATE bookings SET slot_id=? WHERE id=?", [
      newSlotId,
      bookingId,
    ]);
    await connection.query(
      "UPDATE slots SET available = available + 1 WHERE id=?",
      [oldSlotId],
    );
    await connection.query(
      "UPDATE slots SET available = available - 1 WHERE id=?",
      [newSlotId],
    );

    await connection.commit();
    return { message: "Booking rescheduled" };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
