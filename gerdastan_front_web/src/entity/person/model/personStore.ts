import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { IPerson } from '@entity/person';
import { deletePerson, getPerson, getPersonTree, postPerson } from '../api/personApi.ts';
import { createGate } from 'effector-react';
import { convertPersonToTree } from '@feature/person/helpers/convertPersonToTree.ts';
import { IChangePersonName } from '@entity/person/types/personTypes.ts';

export const PersonTreeGate = createGate('PersonTreeGate');

export const fetchPersonTreeFx = createEffect(getPersonTree);

export const fetchPersonDetailFx = createEffect(getPerson);

export const addPersonFx = createEffect(postPerson);

export const deletePersonFx = createEffect(deletePerson);

export const changePersonName = createEvent<IChangePersonName>();

export const $persons = createStore<IPerson[]>([])
  .on(fetchPersonTreeFx.doneData, (_, payload) => payload)
  .on(changePersonName, (state, payload) =>
    state.map((i) => {
      if (i.id === payload.id) {
        return {
          ...i,
          firstName: payload.firstName,
          lastName: payload.lastName,
          gender: payload.gender,
        };
      }
      return i;
    }),
  );

export const $personTree = $persons.map(convertPersonToTree);

forward({
  from: PersonTreeGate.open,
  to: fetchPersonTreeFx,
});

sample({
  clock: deletePersonFx.doneData,
  target: fetchPersonTreeFx,
});
