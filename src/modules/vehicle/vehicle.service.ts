import { pool } from "../../config/db";

// vehicle service
type VehiclePayload = {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
};

const addVehicle = async (payload: VehiclePayload) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  if (daily_rent_price <= 0) {
    throw new Error("Daily rent price must be greater than 0");
  }

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehicles = async () => {
  // implementation for fetching all vehicles
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  return result.rows[0];
};

const updateVehicle = async () => {};

const deleteVehicle = async () => {};

export const vehicleServices = {
  addVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
