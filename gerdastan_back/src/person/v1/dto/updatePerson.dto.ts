import { Prisma } from '@prisma/client';

export type UpdatePersonDto = Omit<Prisma.PersonUpdateInput, 'images'>;
