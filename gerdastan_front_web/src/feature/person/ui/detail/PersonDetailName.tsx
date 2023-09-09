import { useContext } from 'react';
import { PersonDetailFormContext } from '@entity/person/model/createPersonForm.ts';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { useField } from 'effector-forms';
import { Col, Input, Row, Select } from 'antd';
import { withChange } from '@shared/helpers/withChange.ts';
import { GENDER_OPTIONS } from '@feature/person/consts/personConsts.ts';

export const PersonDetailName = () => {
  const formContext = useContext(PersonDetailFormContext);
  const isEditMode = useIsPeronEditMode();
  const { value: firstNameValue, onChange: firstNameChange } = useField(
    formContext.form.fields.firstName,
  );
  const { value: lastNameValue, onChange: lastNameChange } = useField(
    formContext.form.fields.lastName,
  );
  const { value: ganderValue, onChange: genderChange } = useField(formContext.form.fields.gender);

  if (!isEditMode) return null;
  return (
    <Row gutter={2}>
      <Col>
        <Input value={firstNameValue} onChange={withChange(firstNameChange)} />
      </Col>
      <Col>
        <Input value={lastNameValue} onChange={withChange(lastNameChange)} />
      </Col>
      <Col>
        <Select
          value={ganderValue}
          placeholder={'Սեռ'}
          onChange={genderChange}
          options={GENDER_OPTIONS}
        />
      </Col>
    </Row>
  );
};
