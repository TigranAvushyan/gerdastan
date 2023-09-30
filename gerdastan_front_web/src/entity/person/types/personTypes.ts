import { createPersonForm } from '@entity/person/model/createPersonForm.ts';

export enum PersonGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export interface IPerson {
  id: number;
  children?: IPerson[];
  parentId: number | null;
  firstName: string;
  lastName: string;
  gender: PersonGender | null;
}

export interface IAddPerson {
  firstName: string;
  lastName: string;
  parentId: number | null;
  gender: PersonGender | null;
}
export interface IAddPersonFromChildren {
  firstName: string;
  lastName: string;
  childrenId: number | null;
  gender: PersonGender | null;
}

export interface IPostPersonImage {
  id: number;
  data: FormData;
}

export interface IPatchPerson {
  id: number;
  body: Partial<{
    parentId: number | null;
    about: string | null;
    birthday: string | null;
    died: string | null;
    socialNetworks: string[];
    phone: string[];
    address: string[];
  }>;
}

export interface IPersonDetail extends IPerson {
  children?: IPersonDetail[];
  gender: PersonGender | null;
  about: string | null;
  birthday: string | null;
  died: string | null;
  images: string[];
  socialNetworks: string[];
  wifeOrHusband: string | null;
  phone: string[];
  address: string[];
}

export type PersonDetailFormType = ReturnType<typeof createPersonForm>;

export interface IChangePersonName {
  firstName: string;
  lastName: string;
  gender: PersonGender;
  id: number;
}
