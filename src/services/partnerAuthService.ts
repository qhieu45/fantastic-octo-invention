import config from '../config';

/**
 * Super raw implementation to get the partner_id from an apiKey
 * We should implement a more robust & secure system for to go live
 */
export const getPartnerIdFromApiKey = (apiKey: string) => {
  const allKeys = config.partnerApiKeys.split(',');

  const partnerId = allKeys.indexOf(apiKey);

  if (partnerId === -1) {
    throw new Error('API key not found');
  }

  return partnerId + 1;
};
