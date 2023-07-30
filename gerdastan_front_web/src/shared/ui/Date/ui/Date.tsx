import { memo, useCallback } from 'react';
import { Col, DatePicker, Row } from 'antd';
import { getDate } from '@shared/helpers/getDate.ts';

interface Props {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  isEditMode: boolean;
}

export const Date = memo<Props>(({ isEditMode, onChange, value, label }) => {
  const change = useCallback(
    (_: any, value: string) => {
      onChange(value);
    },
    [onChange],
  );
  return (
    <Row gutter={12}>
      <Col span={6}>
        <span>{label}</span>
      </Col>
      <Col span={12}>
        {isEditMode ? <DatePicker defaultValue={getDate(value)} onChange={change} /> : value}
      </Col>
    </Row>
  );
});
