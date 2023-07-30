import { BASE_URL } from '@shared/server';

export const getFilePath = (file: string) => `${BASE_URL}/${file}`;
