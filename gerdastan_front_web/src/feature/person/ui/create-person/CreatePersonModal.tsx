import { FC, useCallback } from 'react';
import { addPersonForm, createPersonModal } from '@entity/person/model/createPerson.ts';
import { Modal } from 'antd';
import { useUnit } from 'effector-react';
import { useForm } from 'effector-forms';
import { withPreventDefault } from '@shared/helpers/withPreventDefault.ts';
import { CreatePersonForm } from '@feature/person/ui/create-person/CreatePersonForm.tsx';

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
      <CreatePersonForm
        firstName={fields.firstName?.value || ''}
        lastName={fields.lastName?.value || ''}
        gender={fields.gender?.value || undefined}
        onChangeFirstName={fields.firstName?.onChange}
        onChangeLastName={fields.lastName?.onChange}
        onChangeGender={fields.gender.onChange}
      />
    </Modal>
  );
};
