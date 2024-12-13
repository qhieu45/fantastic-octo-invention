import z from 'zod';

export const userPostRequest = z.object({
  email: z.string(),
});
