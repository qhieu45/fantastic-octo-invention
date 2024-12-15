import { UserCreateDto } from '../api/dto/UserCreateDto';
import { pool } from '../db';
import { User } from '../db/models/User';
import UserRepository from '../db/repository/UserRepository';

const userRepository = new UserRepository(pool);

export const getUserByEmailAndPartnerId = async (
  email: string,
  partnerId: number,
) => {
  const result = await userRepository.findByEmailAndPartnerId(email, partnerId);
  const user = result.rows[0];

  if (user) {
    const model = new User(
      user.id,
      user.email,
      user.partner_id,
      new Date(user.created_at),
      new Date(user.updated_at),
    );

    return model;
  }

  return null;
};

export const getUsersByPartnerId = async (partnerId: number) => {
  const result = await userRepository.findByPartnerId(partnerId);
  const models = result.rows.map(
    (user) =>
      new User(
        user.id,
        user.email,
        user.partner_id,
        new Date(user.created_at),
        new Date(user.updated_at),
      ),
  );

  return models;
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

export const createUser = async (userCreateDto: UserCreateDto) => {
  try {
    userRepository.insert(userCreateDto);
  } catch (err) {
    console.error('Error inserting user', err);
    throw err;
  }
};
