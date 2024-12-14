import { UserCreateDto } from '../api/dto/UserCreateDto';
import { pool } from '../db';

export const getUserById = async (id: number) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user by ID', err);
    throw err;
  }
};

export const createUser = async (request: UserCreateDto) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (email, partner_id) VALUES($1, $2)',
      [request.email, request.partnerId],
    );
    return result;
  } catch (err) {
    console.error('Error inserting user', err);
    throw err;
  }
};
