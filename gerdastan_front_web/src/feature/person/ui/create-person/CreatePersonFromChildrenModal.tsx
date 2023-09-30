import { FC, useCallback } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'effector-forms';
import { Modal } from 'antd';
import { withPreventDefault } from '@shared/helpers/withPreventDefault.ts';
import { CreatePersonForm } from '@feature/person/ui/create-person/CreatePersonForm.tsx';
import {
  addPersonFromChildrenForm,
  createPersonFromChildrenModal,
} from '@entity/person/model/createPersonFromChildren.ts';

export const CreatePersonFromChildrenModal: FC = () => {
  const { $isOpen, close } = useUnit(createPersonFromChildrenModal);

  const { reset, fields, isValid, isDirty, submit } = useForm(addPersonFromChildrenForm);

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
