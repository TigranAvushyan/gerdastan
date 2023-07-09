export interface IPerson {
  id: number;
  children?: IPerson[];
  parentId: number | null;
  firstName: string;
  lastName: string;
  gender: null;
  about: null;
  birthday: null;
  images: [];
  socialNetworks: [];
  phone: [];
  address: [];
}

export interface ICreatePerson {
  firstName: string;
  lastName: string;
}
