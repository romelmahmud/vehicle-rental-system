import { pool } from "../../config/db";
type VehiclePayload = {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
};

// booking service
const createBooking = async (
  data: Record<string, any>,
  vehicle: VehiclePayload
) => {
  const { vehicle_id, user_id, rent_start_date, rent_end_date } = data;
  const { vehicle_name, type, registration_number, daily_rent_price } = vehicle;
  //  Prevent past start dates
  const now = new Date();
  if (new Date(rent_start_date) < now) {
    throw new Error("booking start day cannot be before today");
  }

  //  Prevent end date before start date
  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    throw new Error("booking end date must be after booking start date");
  }

  // 2. Calculate total price
  const diff =
    (new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime()) /
    (1000 * 60 * 60 * 24);

  const total_price = daily_rent_price * diff;

  const result = await pool.query(
    `INSERT INTO bookings (
        user_id, vehicle_id, vehicle_details,
        rent_start_date, rent_end_date, total_price
     )
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      user_id,
      vehicle_id,
      JSON.stringify({
        vehicle_name: vehicle_name,
        registration_number: registration_number,
        type: type,
      }),
      rent_start_date,
      rent_end_date,
      total_price,
    ]
  );

  return result.rows[0];
};

const getBooking = async (bookingId: number) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

const getAllBookingCustomer = async (user_id: number) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE user_id = $1`, [
    user_id,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows;
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result.rows;
};

const updateBooking = async (bookingId: number, status: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );
  return result.rows[0];
};

export const bookingServices = {
  createBooking,
  getAllBookingCustomer,
  getBooking,
  getAllBookings,
  updateBooking,
};
