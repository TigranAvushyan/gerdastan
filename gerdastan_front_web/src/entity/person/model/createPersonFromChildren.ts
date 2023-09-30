import { createModal } from '@shared/store/modal/createModal.ts';
import { createEvent, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import { addPersonFromChildrenFx, fetchPersonTreeFx } from '@entity/person/model/personStore.ts';
import { IAddPersonFromChildren } from '@entity/person/types/personTypes.ts';
import { personDetailEditMode, personDetailModal } from '@feature/person/model/personDetail.ts';

export const createPersonFromChildrenModal = createModal<number | null>();
export const openCreatePersonFromChildrenModal = createEvent<number | null>();

sample({
  clock: openCreatePersonFromChildrenModal,
  target: createPersonFromChildrenModal.setDataAndOpen,
});

export const addPersonFromChildrenForm = createForm<IAddPersonFromChildren>({
  fields: {
    childrenId: { init: null },
    firstName: { init: '', rules: [{ name: 'required', validator: (value) => !!value }] },
    lastName: { init: '', rules: [{ name: 'required', validator: (value) => !!value }] },
    gender: { init: null, rules: [{ name: 'required', validator: (value) => !!value }] },
  },
  validateOn: ['change'],
});

sample({
  clock: addPersonFromChildrenForm.formValidated,
  target: [addPersonFromChildrenFx, addPersonFromChildrenForm.reset],
});

sample({
  clock: addPersonFromChildrenFx.doneData,
  target: [
    createPersonFromChildrenModal.clearDataAndClose,
    fetchPersonTreeFx,
    personDetailModal.clearDataAndClose,
    personDetailEditMode.setFalse,
  ],
});

forward({
  from: createPersonFromChildrenModal.$data,
  to: addPersonFromChildrenForm.fields.childrenId.onChange,
});
