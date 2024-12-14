import { Router } from 'express';
import {
  createUser,
  getUserByEmailAndPartnerId,
  getUserById,
  getUserByPartnerId,
} from '../../services/userService';
import { userPostRequest } from '../../schemas/user';
import { UserCreateDto } from '../dto/UserCreateDto';
import { validateApiKey } from '../middlewares/validateApiKey';
import { validateRequest } from '../middlewares/validateRequest';
import { getPartnerIdFromApiKey } from '../../services/partnerAuthService';

const route = Router();

export default (app: Router): void => {
  app.use('/users', route);

  route.post(
    '/',
    validateApiKey,
    validateRequest(userPostRequest),
    async (req, res) => {
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

        const userCreateDto = UserCreateDto.from(parsedBody.email, partnerId);
        await createUser(userCreateDto);
        res.status(201).send();
      } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
        return;
      }
    },
  );

  route.get('/', validateApiKey, async (req, res) => {
    try {
      const partnerId = getPartnerIdFromApiKey(req.headers.authorization ?? '');
      const users = await getUserByPartnerId(partnerId);

      res.status(200).send(users);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
  });

  route.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    try {
      const user = await getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Error in /:id route: ', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
};
