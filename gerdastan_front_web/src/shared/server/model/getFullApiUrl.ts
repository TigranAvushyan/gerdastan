import { BASE_URL } from '@shared/server';

export const getFullApiUrl = (url: string) => `${BASE_URL}/api${url}`;
