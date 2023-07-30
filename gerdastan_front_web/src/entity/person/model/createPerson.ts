import { createModal } from '@shared/store/modal/createModal.ts';
import { createEvent, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import { addPersonFx, fetchPersonTreeFx } from '@entity/person/model/personStore.ts';
import { IAddPerson } from '@entity/person/types/personTypes.ts';

export const createPersonModal = createModal<number | null>();
export const openCreatePersonModal = createEvent<number | null>();

sample({
  clock: openCreatePersonModal,
  target: createPersonModal.setDataAndOpen,
});

export const addPersonForm = createForm<IAddPerson>({
  fields: {
    parentId: { init: null },
    firstName: { init: '', rules: [{ name: 'required', validator: (value) => Boolean(value) }] },
    lastName: { init: '', rules: [{ name: 'required', validator: (value) => Boolean(value) }] },
    gender: { init: null, rules: [{ name: 'required', validator: (value) => Boolean(value) }] },
  },
  validateOn: ['change'],
});

sample({
  clock: addPersonForm.formValidated,
  target: [addPersonFx, addPersonForm.reset],
});

sample({
  clock: addPersonFx.doneData,
  target: [createPersonModal.clearDataAndClose, fetchPersonTreeFx],
});

forward({
  from: createPersonModal.$data,
  to: addPersonForm.fields.parentId.onChange,
});
