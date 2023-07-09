import { http, urls } from '../../../shared/server';
import { IPerson } from '../types/personTypes.ts';

export const getPerson = async (id: number) => {
  const res = await http.get(urls.personId(id));
  return res.data;
};
export const postPerson = async (id: number, body: IPerson) => {
  const res = await http.post(urls.personId(id), body);
  return res.data;
};

export const getPersonList = async () => {
  const res = await http.get(urls.person());
  return res.data;
};

export const getPersonTree = async () => {
  const res = await http.get<IPerson[]>(urls.personTree());
  return res.data;
};

export const postPersonImage = async (id: number) => {
  const res = await http.get(urls.personImage(id));
  return res.data;
};
