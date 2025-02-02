"use client"
import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiClient } from '@/api/ApiClient';
import { SliderResponse } from '@/Types/SliderResponse';
import { ColumnsType } from 'antd/es/table';
import { useDeleteSliderImage } from '@/hooks/useDeleteSliderImage';
import { useGetSlidersAdmin } from '@/hooks/useGetSliders';

const Page = () => {
  //TODO: Добавить конвертер изображения в формат WEBP не на стороне пользователя, а на стороне админа. Тогда будет быстрее грузиться, т.к. будет конвертить и сохранять в бд
  const [sliderName, setSliderName] = useState<string>('');
  const [sliders, setSliders] = useState<SliderResponse[]>();

  const {
    isSliderSuccess,
    refetchSlider,
    sliderResponse
  } = useGetSlidersAdmin()

  const {
    deleteSlideAsync,
    isDeleteSlideSuccess
  } = useDeleteSliderImage();
  
  useEffect(() => {
    setSliders(sliderResponse)
  }, [isSliderSuccess,])

  useEffect(() => {
    refetchSlider();
  }, [isDeleteSlideSuccess])
  

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
      setTimeout(() => {
        refetchSlider();
      }, 1000)
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  const handleDelete = async(id: number) => {
    await deleteSlideAsync(id)
  }

  const columns: ColumnsType<SliderResponse> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Изображение",
      dataIndex: "imageData",
      key: "imageData",
      width: 1300,
      render: (data: string) => <img
                          src={`data:image/jpeg;base64,${data}`}
                          alt=''
                          width={200}
                        />
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (<div>
        <Button
          onClick={handleDelete.bind(null, id)}
          color="danger"
          variant="outlined"
        >
          Удалить
        </Button>
      </div>)
    }
  ]

  return (
    <div>
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
      <Table
        key={`${sliders?.length}`}
        columns={columns}
        dataSource={sliders}
      />
    </div>
  );
};

export default Page;
