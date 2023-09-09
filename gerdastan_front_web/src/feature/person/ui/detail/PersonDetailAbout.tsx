import { FC, useContext } from 'react';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { useField } from 'effector-forms';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { withChange } from '@shared/helpers/withChange.ts';
import { EditableInput } from '@entity/editablue-input/EditableInput.tsx';

export const PersonDetailAbout: FC = () => {
  const formContext = useContext(PersonDetailFormContext);
  const { value: aboutValue, onChange } = useField(formContext.form.fields.about);
  const { value: fistName } = useField(formContext.form.fields.firstName);
  const isEditMode = useIsPeronEditMode();

  return (
    <div>
      <EditableInput
        isEditMode={isEditMode}
        isTextArea
        value={aboutValue || ''}
        title={`${fistName}ի մասին`}
        onChange={withChange(onChange)}
      />
    </div>
  );
};
