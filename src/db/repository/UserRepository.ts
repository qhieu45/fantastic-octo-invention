import { Pool } from 'pg';
import { UserCreateDto } from '../../api/dto/UserCreateDto';

export type UserRecord = {
  id: number;
  email: string;
  partner_id: number;
  created_at: string;
  updated_at: string;
};

export default class UserRepository {
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

  async findByPartnerId(partnerId: number) {
    try {
      return this.pool.query<UserRecord>(
        'SELECT * FROM users WHERE partner_id = $1',
        [partnerId],
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
