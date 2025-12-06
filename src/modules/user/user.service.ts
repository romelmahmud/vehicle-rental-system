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

const updateUser = async (id: string, data: Record<string, any>) => {
  const allowedFields = ["name", "email", "phone", "role"];
  const setClauses: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key of Object.keys(data)) {
    if (allowedFields.includes(key)) {
      setClauses.push(`${key}=$${index}`);
      values.push(data[key]);
      index++;
    }
  }

  if (setClauses.length === 0) throw new Error("No valid fields to update");

  setClauses.push("updated_at=NOW()");

  const query = `
    UPDATE users
    SET ${setClauses.join(", ")}
    WHERE id=$${index}
    RETURNING *
  `;

  values.push(id);

  const result = await pool.query(query, values);
  const updateUser = result.rows[0];
  delete updateUser.password;
  return updateUser;
};

export const userServices = {
  getAllUsers,
  updateUser,
};
