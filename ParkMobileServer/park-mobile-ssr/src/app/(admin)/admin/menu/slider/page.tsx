"use client"
import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiClient } from '@/api/ApiClient';

const Page = () => {
  const [sliderName, setSliderName] = useState<string>('');

  const handleSliderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderName(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('sliderName', sliderName);

    const files = (document.getElementById('fileInput') as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const response = await apiClient.PostSliderData(formData)

      if (response.status !== 200) {
        throw new Error('Failed to upload files');
      }

      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Slider Name" required>
        <Input
          type="text"
          value={sliderName}
          onChange={handleSliderNameChange}
          required
        />
      </Form.Item>
      <Form.Item label="Select files" required>
        <Input
          type="file"
          id="fileInput"
          multiple
          required
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Page;
