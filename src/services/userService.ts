import { pool } from '../db';

export const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * from users');
    return result.rows;
  } catch (err) {
    console.error('Error fetching users', err);
    throw err;
  }
};

export const getUserById = async (id: number) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user by ID', err);
    throw err;
  }
};
