import { createEvent, createStore } from 'effector';

export const createToggle = (defaultValue = false) => {
  const setTrue = createEvent();
  const setFalse = createEvent();
  const setState = createEvent<boolean>();
  const toggle = createEvent<unknown>();

  const $state = createStore(defaultValue)
    .on(setState, (_, payload) => payload)
    .on(toggle, (state) => !state)
    .on(setTrue, () => true)
    .on(setFalse, () => false);

  return { $state, setFalse, setTrue, setState, toggle };
};
