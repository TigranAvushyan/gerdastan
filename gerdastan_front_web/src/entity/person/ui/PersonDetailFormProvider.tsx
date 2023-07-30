import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  createPersonForm,
  PersonDetailFormContext,
} from '@entity/person/model/createPersonForm.ts';
import { IPersonDetail, PersonDetailFormType } from '@entity/person/types/personTypes.ts';

interface Props {
  person: IPersonDetail;
  children: ReactNode;
}

export const PersonDetailFormProvider: FC<Props> = ({ person, children }) => {
  const [form, setForm] = useState<PersonDetailFormType>(createPersonForm(person));
  const renderCount = useRef(0);

  useEffect(() => {
    if (renderCount.current > 0) {
      setForm(createPersonForm(person));
    }
    renderCount.current++;
  }, [person]);

  return (
    <PersonDetailFormContext.Provider value={form}>{children}</PersonDetailFormContext.Provider>
  );
};
