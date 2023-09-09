import { createModal } from '@shared/store/modal/createModal.ts';
import { createEvent, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import { addPersonFx, fetchPersonTreeFx } from '@entity/person/model/personStore.ts';
import { IAddPerson } from '@entity/person/types/personTypes.ts';
import { personDetailEditMode, personDetailModal } from '@feature/person/model/personDetail.ts';

export const createPersonModal = createModal<number | null>();
export const openCreatePersonModal = createEvent<number | null>();

sample({
  clock: openCreatePersonModal,
  target: createPersonModal.setDataAndOpen,
});

export const addPersonForm = createForm<IAddPerson>({
  fields: {
    parentId: { init: null },
    firstName: { init: '', rules: [{ name: 'required', validator: (value) => !!value }] },
    lastName: { init: '', rules: [{ name: 'required', validator: (value) => !!value }] },
    gender: { init: null, rules: [{ name: 'required', validator: (value) => !!value }] },
  },
  validateOn: ['change'],
});

sample({
  clock: addPersonForm.formValidated,
  target: [addPersonFx, addPersonForm.reset],
});

sample({
  clock: addPersonFx.doneData,
  target: [
    createPersonModal.clearDataAndClose,
    fetchPersonTreeFx,
    personDetailModal.clearDataAndClose,
    personDetailEditMode.setFalse,
  ],
});

forward({
  from: createPersonModal.$data,
  to: addPersonForm.fields.parentId.onChange,
});
