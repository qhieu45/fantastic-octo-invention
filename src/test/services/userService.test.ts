const findByEmailAndPartnerIdFn = jest.fn();
jest.mock('../../db/repository/UserRepository', () =>
  jest.fn().mockImplementation(() => {
    return {
      constructor: () => {},
      findByEmailAndPartnerId: findByEmailAndPartnerIdFn,
    };
  }),
);

import { UserRecord } from '../../db/repository/UserRepository';
import { getUserByEmailAndPartnerId } from '../../services/userService';
import { QueryResult } from 'pg';

const getQueryResult = (result: QueryResult['rows']) => ({
  rows: result,
  command: '',
  rowCount: 0,
  oid: 1,
  fields: [],
});

describe('UserService', () => {
  it('should get a user by email and partnerId', async () => {
    const mockUser: UserRecord = {
      id: 1,
      email: 'testi@abc',
      partner_id: 2,
      created_at: 'aaa',
      updated_at: 'aaa',
    };

    findByEmailAndPartnerIdFn.mockResolvedValueOnce(getQueryResult([mockUser]));

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
