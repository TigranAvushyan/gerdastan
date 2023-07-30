import { FC, useContext } from 'react';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { useField } from 'effector-forms';
import TextArea from 'antd/es/input/TextArea';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { withChange } from '@shared/helpers/withChange.ts';
import { Typography } from 'antd';

export const PersonDetailAbout: FC = () => {
  const formContext = useContext(PersonDetailFormContext);
  const { value: aboutValue, onChange } = useField(formContext.form.fields.about);
  const { value: fistName } = useField(formContext.form.fields.firstName);
  const isEditMode = useIsPeronEditMode();

  if (!isEditMode) {
    return aboutValue ? (
      <div>
        <Typography.Title level={5}>{fistName}ի մասին</Typography.Title>
        <Typography.Paragraph>{aboutValue}</Typography.Paragraph>
      </div>
    ) : null;
  }
  return (
    <div>
      <Typography.Title level={5}>{fistName}ի մասին</Typography.Title>
      <TextArea value={aboutValue || ''} onChange={withChange(onChange)}></TextArea>
    </div>
  );
};
