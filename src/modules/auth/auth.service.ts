// auth service
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

type RegisterUserPayload = {
  name: string;
  role: string;
  email: string;
  password: string;
  phone: string;
};

const registerUser = async (payload: RegisterUserPayload) => {
  const { name, role, email, password, phone } = payload;
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  if (role !== "admin" && role !== "customer") {
    throw new Error("Role must be either 'admin' or 'customer'");
  }
  const hashPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, role, email, password, phone) VALUES($1,$2, $3, $4, $5) RETURNING *`,
    [name, role, email, hashPassword, phone]
  );
  return result;
};

export const authServices = {
  registerUser,
};
