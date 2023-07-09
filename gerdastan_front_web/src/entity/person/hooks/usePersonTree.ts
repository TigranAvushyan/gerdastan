import { useGate, useStore } from 'effector-react';
import { $personTree, fetchPersonTreeFx, PersonTreeGate } from '../model/personStore.ts';

export const usePersonTree = () => {
  useGate(PersonTreeGate);

  const tree = useStore($personTree);
  const isTreeLoading = useStore(fetchPersonTreeFx.pending);

  return {
    tree,
    isTreeLoading: isTreeLoading,
  };
};
