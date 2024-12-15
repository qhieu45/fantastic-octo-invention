const findByEmailAndPartnerIdFn = jest.fn();
const findByPartnerIdFn = jest.fn();
const insertFn = jest.fn();
jest.mock('../../db/repository/UserRepository', () =>
  jest.fn().mockImplementation(() => {
    return {
      constructor: () => {},
      findByEmailAndPartnerId: findByEmailAndPartnerIdFn,
      findByPartnerId: findByPartnerIdFn,
      insert: insertFn,
    };
  }),
);

import { UserCreateDto } from '../../api/dto/UserCreateDto';
import { UserRecord } from '../../db/repository/UserRepository';
import {
  createUser,
  getUserByEmailAndPartnerId,
  getUsersByPartnerId,
} from '../../services/userService';
import { QueryResult } from 'pg';

const getQueryResult = (result: QueryResult['rows']) => ({
  rows: result,
  command: '',
  rowCount: 0,
  oid: 1,
  fields: [],
});

describe('UserService', () => {
  describe('getUserByEmailAndPartnerId', () => {
    it('should get a user by email and partnerId', async () => {
      const mockUser: UserRecord = {
        id: 1,
        email: 'testi@abc',
        partner_id: 2,
        created_at: 'aaa',
        updated_at: 'aaa',
      };

      findByEmailAndPartnerIdFn.mockResolvedValueOnce(
        getQueryResult([mockUser]),
      );

      const user = await getUserByEmailAndPartnerId('testi@abc', 1);

      expect(user).not.toBeNull();
      expect(user?.id).toBe(mockUser.id);
      expect(user?.email).toBe(mockUser.email);
      expect(user?.partnerId).toBe(mockUser.partner_id);
    });

    it('should return null if user not found', async () => {
      findByEmailAndPartnerIdFn.mockResolvedValueOnce(getQueryResult([]));

      const user = await getUserByEmailAndPartnerId('testi@abc', 1);

      expect(user).toBeNull();
    });
  });

  describe('getUsersByPartnerId', () => {
    it('should return all users of a partner id', async () => {
      const mockUser1: UserRecord = {
        id: 1,
        email: 'testi@abc',
        partner_id: 2,
        created_at: 'aaa',
        updated_at: 'aaa',
      };

      const mockUser2 = { ...mockUser1, id: 2, email: 'testi2@abc' };

      findByPartnerIdFn.mockResolvedValueOnce(
        getQueryResult([mockUser1, mockUser2]),
      );

      const [user1, user2] = await getUsersByPartnerId(mockUser1.partner_id);

      expect(user1?.id).toBe(mockUser1.id);
      expect(user1?.email).toBe(mockUser1.email);
      expect(user2?.id).toBe(mockUser2.id);
      expect(user2?.email).toBe(mockUser2.email);
    });
  });

  describe('createUser', () => {
    it('should insert a new user into DB with userRepository', () => {
      const dto = new UserCreateDto('testi@abc.com', 1);

      createUser(dto);

      expect(insertFn).toHaveBeenCalledWith(dto);
    });
  });
});
