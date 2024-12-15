import { Request, Response } from 'express';
import { userPostRequest } from '../../schemas/user';
import { getPartnerIdFromApiKey } from '../../services/partnerAuthService';
import {
  getUserByEmailAndPartnerId,
  createUser,
  getUsersByPartnerId,
} from '../../services/userService';
import { UserCreateDto } from '../dto/UserCreateDto';

export const createNewUser = async (req: Request, res: Response) => {
  const parsedBody = userPostRequest.parse(req.body);
  const partnerId = getPartnerIdFromApiKey(req.headers.authorization ?? '');

  try {
    const existingUser = await getUserByEmailAndPartnerId(
      parsedBody.email,
      partnerId,
    );

    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const userCreateDto = new UserCreateDto(parsedBody.email, partnerId);
    await createUser(userCreateDto);
    res.status(201).send();
  } catch {
    res.status(500).json({ error: 'Error creating user' });
    return;
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const partnerId = getPartnerIdFromApiKey(req.headers.authorization ?? '');
    const users = await getUsersByPartnerId(partnerId);

    res.status(200).send(users);
  } catch {
    res.status(500).json({ error: 'Error fetching users' });
    return;
  }
};
