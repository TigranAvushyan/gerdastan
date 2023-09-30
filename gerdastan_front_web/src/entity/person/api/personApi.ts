import { http, urls } from '../../../shared/server';
import { IPatchPerson, IPerson, IPersonDetail, IPostPersonImage } from '../types/personTypes.ts';

export const getPerson = async (id: number) => {
  const res = await http.get<IPersonDetail>(urls.personId(id));
  return res.data;
};
export const postPerson = async (body: Omit<IPerson, 'id'>) => {
  const res = await http.post<IPerson>(urls.person(), body);
  return res.data;
};
export const postCreateParent = async (id: number, body: Omit<IPerson, 'id'>) => {
  const res = await http.post<IPerson>(urls.createParent(id), body);
  return res.data;
};

export const deletePerson = async (id: number) => {
  const res = await http.delete(urls.personId(id));
  return res.data;
};

export const patchPerson = async (data: IPatchPerson) => {
  const res = await http.patch(urls.personId(data.id), data.body);
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

export const postPersonImage = async ({ id, data }: IPostPersonImage) => {
  const res = await http.get(urls.personImage(id), {
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
