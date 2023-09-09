import { ChangeEvent, FC } from 'react';
import { Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface Props {
  isEditMode: boolean;
  value?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  title: string;
  isTextArea?: boolean;
}

export const EditableInput: FC<Props> = ({ isEditMode, value, title, onChange, isTextArea }) => {
  if (!isEditMode) {
    return value ? (
      <>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Paragraph>{value}</Typography.Paragraph>
      </>
    ) : null;
  }
  return (
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      {isTextArea ? (
        <TextArea value={value} onChange={onChange}></TextArea>
      ) : (
        <Input value={value} onChange={onChange} />
      )}
    </>
  );
};
