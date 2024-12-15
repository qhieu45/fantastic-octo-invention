import { Pool } from 'pg';
import { User } from '../models/User';
import { UserCreateDto } from '../../api/dto/UserCreateDto';

type UserRecord = {
  id: number;
  email: string;
  partner_id: number;
  created_at: string;
  updated_at: string;
};

export class UserRepository {
  constructor(private pool: Pool) {}

  async findByEmailAndPartnerId(email: string, partnerId: number) {
    try {
      const result = await this.pool.query<UserRecord>(
        'SELECT * FROM users WHERE email = $1 AND partner_id = $2',
        [email, partnerId],
      );
      return result;
    } catch (err) {
      console.error('Error fetching user by email & partnerId', err);
      throw err;
    }
  }

  async getUsersByPartnerId(partnerId: number): Promise<User[]> {
    try {
      const result = await this.pool.query<UserRecord>(
        'SELECT * FROM users WHERE partner_id = $1',
        [partnerId],
      );
      return result.rows.map(
        (user) =>
          new User(
            user.id,
            user.email,
            user.partner_id,
            new Date(user.created_at),
            new Date(user.updated_at),
          ),
      );
    } catch (err) {
      console.error('Error fetching users for partnerId', err);
      throw err;
    }
  }

  async insert(user: UserCreateDto) {
    try {
      await this.pool.query<UserRecord>(
        'INSERT INTO users (email, partner_id) VALUES ($1, $2) RETURNING *',
        [user.email, user.partnerId],
      );
    } catch (err) {
      console.error('Error inserting user', err);
      throw err;
    }
  }
}
