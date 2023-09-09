import { FC, useContext } from 'react';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { useField } from 'effector-forms';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { EditableInput } from '@entity/editablue-input/EditableInput.tsx';
import { withChange } from '@shared/helpers/withChange.ts';

export const PersonDetailWifeOrHusband: FC = () => {
  const formContext = useContext(PersonDetailFormContext);
  const isEditMode = useIsPeronEditMode();
  const { value, onChange } = useField(formContext.form.fields.wifeOrHusband);
  const { value: gender } = useField(formContext.form.fields.gender);
  const title = gender === 'MALE' ? 'Կնոջ մասին' : 'Ամուսնու մասին';

  return (
    <EditableInput
      isEditMode={isEditMode}
      isTextArea
      value={value || ''}
      title={title}
      onChange={withChange(onChange)}
    />
  );
};
