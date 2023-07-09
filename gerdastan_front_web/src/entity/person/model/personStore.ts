import { createEffect, createStore, forward } from 'effector';
import { IPerson } from '@entity/person';
import { getPersonTree } from '../api/personApi.ts';
import { createGate } from 'effector-react';
import { convertPersonToTree } from '@feature/person/helpers/convertPersonToTree.ts';

export const PersonTreeGate = createGate('PersonTreeGate');

export const fetchPersonTreeFx = createEffect(getPersonTree);

export const $persons = createStore<IPerson[]>([]).on(
  fetchPersonTreeFx.doneData,
  (_, payload) => payload,
);

export const $personTree = $persons.map(convertPersonToTree);

forward({
  from: PersonTreeGate.open,
  to: fetchPersonTreeFx,
});
