import { createEvent, createStore, sample } from 'effector';
import { createToggle } from '@shared/store/toggle/createToggle.ts';

export const createModal = <T>() => {
  const {
    setTrue: open,
    $state: $isOpen,
    setFalse: close,
    toggle: toggleOpen,
    setState: setOpen,
  } = createToggle();
  const setData = createEvent<T>();
  const clearData = createEvent();
  const $data = createStore<T | null>(null)
    .on(setData, (_, payload) => payload)
    .on(clearData, () => null);

  const setDataAndOpen = createEvent<T>();
  const clearDataAndClose = createEvent<T>();

  sample({
    clock: setDataAndOpen,
    target: [setData, open],
  });

  sample({
    clock: clearDataAndClose,
    target: [close, clearData],
  });

  return {
    $data,
    setData,
    setDataAndOpen,
    clearDataAndClose,
    $isOpen,
    clearData,
    close,
    open,
    toggleOpen,
    setOpen,
  };
};
