import { Request, Response, NextFunction } from 'express';
import { getPartnerIdFromApiKey } from '../../services/partnerAuthService';

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized! Invalid api key' });
    return;
  }

  try {
    getPartnerIdFromApiKey(authHeader);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized! Invalid api key' });
    return;
  }
};
