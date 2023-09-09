import { FC, useContext } from 'react';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { useField } from 'effector-forms';
import { Date } from '@shared/ui/Date/ui/Date.tsx';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import styles from './person-detail.module.css';

const showDate = (isEditMode: boolean, hasValue: boolean) => {
  if (isEditMode) return true;
  return hasValue;
};

export const PersonDetailDate: FC = () => {
  const formContext = useContext(PersonDetailFormContext);
  const { value: birthdayValue, onChange: birthdayOnChange } = useField(
    formContext.form.fields.birthday,
  );
  const isEditMode = useIsPeronEditMode();
  const { value: diedValue, onChange: diedOnChange } = useField(formContext.form.fields.died);

  return (
    <div>
      <div className={styles.widget}>
        {showDate(isEditMode, !!birthdayValue) && (
          <Date
            onChange={birthdayOnChange}
            isEditMode={isEditMode}
            value={birthdayValue || ''}
            label={'Ծնվել է'}
          />
        )}
      </div>
      <div className={styles.widget}>
        {showDate(isEditMode, !!diedValue) && (
          <Date
            onChange={diedOnChange}
            isEditMode={isEditMode}
            value={diedValue || ''}
            label={'Մահացել է'}
          />
        )}
      </div>
    </div>
  );
};
