import { FC, useContext } from 'react';
import { Button, Popconfirm, Space } from 'antd';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { useForm } from 'effector-forms';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { openCreatePersonModal } from '@entity/person/model/createPerson.ts';
import { deletePersonFx } from '@entity/person/model/personStore.ts';
import { useStore } from 'effector-react';
import { QuestionCircleOutlined } from '@ant-design/icons';

type Props = {
  canDelete: boolean;
};

export const PersonDetailFooter: FC<Props> = ({ canDelete }) => {
  const formContext = useContext(PersonDetailFormContext);
  const isEditMode = useIsPeronEditMode();
  const { submit, isValid, isDirty, fields } = useForm(formContext.form);
  const deleteLoading = useStore(formContext.updatePersonFx.pending);
  const updateLoading = useStore(deletePersonFx.pending);

  const createChildren = () => {
    openCreatePersonModal(fields.id?.value || null);
  };

  if (!(isEditMode && fields.id.value)) return null;

  return (
    <Space>
      <Button onClick={createChildren}>Նոր սերունդ</Button>
      <Popconfirm
        title={`Ջնջե՞լ ամբողջ ինֆորմաոիան ${fields.firstName?.value}ի մասին`}
        okText={'Այո'}
        cancelText={'Ոչ'}
        onConfirm={() => deletePersonFx(fields.id.value)}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      >
        {canDelete && (
          <Button danger loading={deleteLoading}>
            Ջնջել
          </Button>
        )}
      </Popconfirm>

      <Button
        onClick={() => {
          submit();
        }}
        loading={updateLoading}
        disabled={isDirty && !isValid}
        type="primary"
      >
        Հաստատել
      </Button>
    </Space>
  );
};
