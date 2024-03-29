import { IPersonDetail, PersonDetailFormType } from '@entity/person/types/personTypes.ts';
import { AnyFormValues, createForm, FormFieldConfigs } from 'effector-forms';
import { createEffect, sample } from 'effector';
import { patchPerson, postPersonImage } from '@entity/person/api/personApi.ts';
import { createContext } from 'react';
import { personDetailEditMode, personDetailModal } from '@feature/person/model/personDetail.ts';
import { changePersonName } from '@entity/person/model/personStore.ts';

const convertToForm = <V extends AnyFormValues>(person?: IPersonDetail): FormFieldConfigs<V> => {
  const obj: any = {};
  if (!person) return obj;
  Object.entries(person).forEach(([key, value]) => {
    if (key !== 'images')
      obj[key] = {
        init: value,
      };
  });
  return obj;
};
export const createPersonForm = (person?: IPersonDetail) => {
  const form = createForm({
    fields: convertToForm<IPersonDetail>(person),
  });
  const uploadImageFx = createEffect(async (images: string[]) => {
    if (person) {
      const data = new FormData();
      images.forEach((image) => {
        data.append(image, image);
      });
      await postPersonImage({ id: person.id, data });
    }
  });

  const updatePersonFx = createEffect(patchPerson);

  sample({
    clock: form.formValidated,
    fn: ({ id, ...body }) => {
      return { id, body };
    },
    target: [updatePersonFx, personDetailModal.clearDataAndClose, personDetailEditMode.setFalse],
  });

  sample({
    clock: updatePersonFx.doneData,
    target: form.reset,
  });

  sample({
    source: form.$values,
    clock: updatePersonFx.doneData,
    fn: (form, clock) => ({
      id: form.id,
      firstName: clock.firstName,
      lastName: clock.lastName,
      gender: clock.gender,
    }),
    target: changePersonName,
  });

  return {
    uploadImageFx,
    updatePersonFx,
    form,
  };
};

export const PersonDetailFormContext = createContext<PersonDetailFormType>(createPersonForm());
