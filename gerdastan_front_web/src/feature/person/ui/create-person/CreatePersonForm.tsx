import { FC } from 'react';
import { Input, Select } from 'antd';
import styles from '@feature/person/ui/create-person/create-person.module.css';
import { withChange } from '@shared/helpers/withChange.ts';
import cn from 'classnames';
import { GENDER_OPTIONS } from '@feature/person/consts/personConsts.ts';
import { PersonGender } from '@entity/person/types/personTypes.ts';

interface Props {
  firstName: string;
  onChangeFirstName: (value: string) => void;
  lastName: string;
  onChangeLastName: (value: string) => void;
  gender?: PersonGender;
  onChangeGender: (value: PersonGender) => void;
}

export const CreatePersonForm: FC<Props> = ({
  firstName,
  onChangeFirstName,
  onChangeLastName,
  onChangeGender,
  lastName,
  gender,
}) => {
  return (
    <>
      <Input
        className={styles.field}
        onChange={withChange(onChangeFirstName)}
        value={firstName}
        addonBefore={'Անուն'}
      />
      <Input
        className={styles.field}
        onChange={withChange(onChangeLastName)}
        value={lastName}
        addonBefore={'Ազգանուն'}
      />
      <Select
        className={cn(styles.select, styles.field)}
        value={gender}
        placeholder={'Սեռ'}
        onChange={onChangeGender}
        options={GENDER_OPTIONS}
      />
    </>
  );
};
