import { FC, useCallback } from 'react';
import { addPersonForm, createPersonModal } from '@entity/person/model/createPerson.ts';
import { Input, Modal, Select } from 'antd';
import { useUnit } from 'effector-react';
import { withChange } from '@shared/helpers/withChange.ts';
import styles from './create-person.module.css';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import { withPreventDefault } from '@shared/helpers/withPreventDefault.ts';
import { GENDER_OPTIONS } from '@feature/person/consts/personConsts.ts';

export const CreatePersonModal: FC = () => {
  const { $isOpen, close } = useUnit(createPersonModal);

  const { reset, fields, isValid, isDirty, submit } = useForm(addPersonForm);
  const closeModal = useCallback(() => {
    reset();
    close();
  }, [close, reset]);

  return (
    <Modal
      title={'Ընտանիքի նոր անդամ'}
      okText={'Ողարկել'}
      cancelText={'Չեղարկել'}
      okButtonProps={{ disabled: !(isDirty && isValid) }}
      open={$isOpen}
      onOk={withPreventDefault(submit)}
      onCancel={closeModal}
    >
      <Input
        className={styles.field}
        onChange={withChange(fields.firstName.onChange)}
        value={fields.firstName?.value || ''}
        addonBefore={'Անուն'}
      />
      <Input
        className={styles.field}
        onChange={withChange(fields.lastName.onChange)}
        value={fields.lastName?.value || ''}
        addonBefore={'Ազգանուն'}
      />
      <Select
        className={cn(styles.select, styles.field)}
        value={fields.gender?.value}
        placeholder={'Սեռ'}
        onChange={fields.gender.onChange}
        options={GENDER_OPTIONS}
      />
    </Modal>
  );
};
