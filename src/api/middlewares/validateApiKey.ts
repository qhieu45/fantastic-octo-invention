import { Request, Response, NextFunction } from 'express';

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;

  const validAuth = auth && auth == 'valid_key';

  if (!validAuth) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
