import React, {useEffect, useState} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const UploadComponent = (props) => {
  const { form } = props
  const image = form?.getFieldValue("image")

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);

  useEffect(() => {
    setImageUrl(image)
  }, [image]);

  const beforeUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'yirica');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/yirica/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url);
        setLoading(false);
        form.setFieldValue("image", data.secure_url);
      } else {
        message.error('Upload failed.');
        setLoading(false);
      }
    } catch (error) {
       console.error(error)
      message.error('Upload failed.');
      setLoading(false);
    }

    return false;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default UploadComponent;
