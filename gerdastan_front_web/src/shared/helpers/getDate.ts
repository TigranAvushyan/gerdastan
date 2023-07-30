import dayjs from 'dayjs';

export const getDate = (date?: string | null) => {
  if (!date) return undefined;
  return dayjs(date);
};
