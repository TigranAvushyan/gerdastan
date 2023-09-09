import { FC, useState } from 'react';
import { Col, Image, Row, Upload } from 'antd';
import { getFilePath } from '@shared/server/model/getFilePath.ts';
import { PlusOutlined } from '@ant-design/icons';
import { useIsPeronEditMode } from '@feature/person/hooks/useIsPeronEditMode.ts';
import { BASE_URL } from '@shared/server';
import { getBase64 } from '@shared/helpers/getBase64.ts';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { RcFile } from 'antd/es/upload';

interface Props {
  images: string[];
  personId: number;
}

export const PersonDetailImageView: FC<Props> = ({ images, personId }) => {
  const isEditMode = useIsPeronEditMode();
  const [newImages, setNewImages] = useState<string[]>([]);

  const addNewLocalImage = async ({ file }: UploadChangeParam) => {
    if (!file.url && !file.preview) {
      const res = await getBase64(file.originFileObj as RcFile);
      setNewImages((p) => {
        const set = new Set(p);
        set.add(res);
        return [...set];
      });
    }
  };

  return (
    <>
      <Row gutter={[5, 5]}>
        {isEditMode && (
          <Col>
            <Upload
              action={`${BASE_URL}/api/v1/person/${personId}/image`}
              onChange={addNewLocalImage}
              name="image"
              listType="picture-card"
              showUploadList={false}
            >
              <div>
                {<PlusOutlined />}
                <div style={{ marginTop: 8 }}>Բեռնել լուսանկար</div>
              </div>
            </Upload>
          </Col>
        )}
        <Image.PreviewGroup>
          {images.map((i, index) => (
            <Col key={index}>
              <Image height={102} style={{ borderRadius: 8 }} src={getFilePath(i)} />
            </Col>
          ))}
          {newImages.map((i, index) => (
            <Col key={index}>
              <Image height={102} style={{ borderRadius: 8 }} src={i} />
            </Col>
          ))}
        </Image.PreviewGroup>
      </Row>
    </>
  );
};
