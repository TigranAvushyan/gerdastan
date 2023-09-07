import { FC } from 'react';
import { useUnit } from 'effector-react';
import { personDetailEditMode, personDetailModal } from '@feature/person/model/personDetail.ts';
import { Modal } from 'antd';
import { getFullName } from '@entity/person/helpers/getFullName.ts';
import { PersonDetailImageView } from '@feature/person/ui/detail/PersonDetailImageView.tsx';
import { PersonDetailDate } from '@feature/person/ui/detail/PersonDetailDate.tsx';
import { EditOutlined } from '@ant-design/icons';
import { PersonDetailFormProvider } from '@entity/person/ui/PersonDetailFormProvider.tsx';
import { PersonDetailAbout } from '@feature/person/ui/detail/PersonDetailAbout.tsx';
import { PersonDetailFooter } from '@feature/person/ui/detail/PersonDetailFooter.tsx';

export const PersonDetailModal: FC = () => {
  const { $data: person, close, $isOpen } = useUnit(personDetailModal);
  const closeModal = () => {
    close();
    personDetailEditMode.setFalse();
  };

  if (!person) return null;

  return (
    <Modal
      title={
        <div>
          {getFullName(person)}
          <EditOutlined onClick={personDetailEditMode.toggle} />
        </div>
      }
      open={$isOpen}
      footer={null}
      onCancel={closeModal}
    >
      <PersonDetailFormProvider person={person}>
        <PersonDetailImageView personId={person.id} images={person.images} />
        <PersonDetailDate />
        <PersonDetailAbout />
        <PersonDetailFooter />
      </PersonDetailFormProvider>
    </Modal>
  );
};
