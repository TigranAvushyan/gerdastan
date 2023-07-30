import { FC } from 'react';
import { Col, Image, Row, Upload } from 'antd';
import { useToggle } from '@shared/hooks/useToggle/useToggle.ts';
import { getFilePath } from '@shared/server/model/getFilePath.ts';
import { PlusOutlined } from '@ant-design/icons';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';

interface Props {
  images: string[];
}

export const PersonDetailImageView: FC<Props> = ({ images }) => {
  const { active, setActive, setTrue } = useToggle();
  const isEditMode = useIsPeronEditMode();
  return (
    <>
      <Row>
        {isEditMode && (
          <Col>
            <Upload name="image" listType="picture-card" showUploadList={false}>
              <div>
                {<PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Col>
        )}
        {images[0] && (
          <Col>
            <Image
              preview={{ visible: false }}
              height={102}
              style={{ borderRadius: 8 }}
              src={getFilePath(images[0])}
              onClick={setTrue}
            />
          </Col>
        )}
      </Row>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible: active, onVisibleChange: setActive }}>
          {images.map((i, index) => (
            <Image key={index} src={getFilePath(i)} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
