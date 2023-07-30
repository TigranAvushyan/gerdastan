import { useUnit } from 'effector-react';
import { personDetailEditMode } from '@feature/person/model/personDetail.ts';

export const useIsPeronEditMode = () => {
  const { $state: isEditMode } = useUnit(personDetailEditMode);
  return isEditMode;
};
