// auth service
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { pool } from "../../config/db";

type RegisterUserPayload = {
  name: string;
  role: string;
  email: string;
  password: string;
  phone: string;
};

const signupUser = async (payload: RegisterUserPayload) => {
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

const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email= $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );
  delete user.password;

  return { token, user };
};

export const authServices = {
  signinUser,
  signupUser,
};
