import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  const userData = result.rows.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  });
  return userData;
};

const updateUser = async (id: string, data: any) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4, updated_at=NOW() WHERE id=$5 RETURNING *`,
    [data.name, data.email, data.phone, data.role, id]
  );
  return result;
};

export const userServices = {
  getAllUsers,
  updateUser,
};
