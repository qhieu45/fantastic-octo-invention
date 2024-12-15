import { Router } from 'express';
import { userPostRequest } from '../../schemas/user';
import { validateApiKey } from '../middlewares/validateApiKey';
import { validateRequest } from '../middlewares/validateRequest';
import { createNewUser, getUsers } from '../controller/userController';

const route = Router();

export default (app: Router): void => {
  app.use('/users', route);

  route.post(
    '/',
    validateApiKey,
    validateRequest(userPostRequest),
    createNewUser,
  );

  route.get('/', validateApiKey, getUsers);
};
