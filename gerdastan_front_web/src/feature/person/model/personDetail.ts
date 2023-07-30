import { createModal } from '@shared/store/modal/createModal.ts';
import { createEvent, forward, sample } from 'effector';
import { IPersonDetail } from '@entity/person/types/personTypes.ts';
import { deletePersonFx, fetchPersonDetailFx } from '@entity/person/model/personStore.ts';
import { createToggle } from '@shared/store/toggle/createToggle.ts';

export const personDetailModal = createModal<IPersonDetail>();
export const personDetailEditMode = createToggle();

export const showPersonDetail = createEvent<number>();

forward({
  from: showPersonDetail,
  to: fetchPersonDetailFx,
});
forward({
  from: deletePersonFx.done,
  to: personDetailModal.close,
});

sample({
  clock: fetchPersonDetailFx.doneData,
  target: personDetailModal.setDataAndOpen,
});
