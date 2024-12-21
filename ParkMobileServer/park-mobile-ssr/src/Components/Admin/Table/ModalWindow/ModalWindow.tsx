"use client";
import {
  Button,
  // ColorPicker,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Upload,
  UploadProps,
} from "antd";
import styles from "./ModalWindow.module.scss";
import { FC, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { apiClient } from "@/api/ApiClient";
import { CardItemDTO } from "@/Entities/CardItemDTO";
import { FormItemChange } from "../MenuPage";
import { useUpdatePhoto } from "@/hooks/useUpdatePhoto";
import { CardTypeAdmin } from "@/Types/CardTypeAdmin";
import { useGetItemsAdmin } from "@/hooks/useGetItemsAdmin";
// import { AggregationColor } from "antd/es/color-picker/color";

type BrandAndOptions = {
  label: string;
  value: number;
};

type ModalWindowProps = {
  closeModal: () => void;
  open: boolean;
  selectedItem: CardTypeAdmin | undefined | null;
  brandsOptions: BrandAndOptions[];
  categoriesOptions: BrandAndOptions[];
  handleDelete: (id: number) => void;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const ModalWindow: FC<ModalWindowProps> = ({
  closeModal,
  open,
  selectedItem,
  brandsOptions,
  categoriesOptions,
  handleDelete,
}) => {
  const { refetchItemsList } = useGetItemsAdmin();
  const { updatePhoto } = useUpdatePhoto();

  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const [currentSelectOption] = useState<string>();

  useEffect(() => {
    form.setFieldValue("optionValue", "");
  }, [currentSelectOption]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  const handleFinishForm = async (newItem: FormItemChange) => {
    console.log(newItem)
    //POST
    // const options = {
    //   type: newItem.optionName ?? "",
    //   value:
    //     typeof newItem.optionValue === "string"
    //       ? newItem.optionValue
    //       : `#${newItem.optionValue.toHex()}`,
    // };

    // const _options = JSON.stringify(options);

    if (selectedItem) {
      const mappedItem: CardItemDTO = {
        id: selectedItem?.id ?? 0,
        name: newItem.name,
        price: newItem.price,
        stock: newItem.stock,
        article: newItem.article,
        discountPrice: newItem.discountPrice,
        description: newItem.description,
        categoryId: newItem.categoryId,
        itemBrandId: newItem.brandId,
        isPopular: newItem.isPopular,
        isNewItem: newItem.isNewItem,
        // options: _options,
      };
      try {
        await apiClient.UpdateItem(mappedItem);
        setTimeout(() => {
          refetchItemsList();
        }, 2000);
        refetchItemsList();
      } catch (error) {
        message.info(`Ошибка с запросом! ${error}`);
      } finally {
        closeModal();
      }
    }
    //ADD
    else {
      const mappedItem: Omit<CardItemDTO, "id"> = {
        name: newItem.name,
        price: newItem.price,
        stock: newItem.stock,
        article: newItem.article,
        discountPrice: newItem.discountPrice,
        description: newItem.description,
        categoryId: newItem.categoryId,
        itemBrandId: newItem.brandId,
        isPopular: newItem.isPopular,
        isNewItem: newItem.isNewItem,
        // options: _options,
      };
      try {
        await apiClient.AddItem(mappedItem);
        refetchItemsList();
      } catch (error) {
        message.info(`Ошибка с запросом! ${error}`);
      } finally {
        closeModal();
      }
    }
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      try {
        const blob = await fileToBlob(info.file.originFileObj as FileType);

        const formData = new FormData();
        formData.append("image", blob);
        formData.append("id", selectedItem?.id?.toString() ?? "");
        updatePhoto(formData);
      } finally {
        setLoading(false);
        setTimeout(() => {
          refetchItemsList();
        }, 2000);
      }
    } else if (info.file.status === "error") {
      setLoading(false);
    }
  };

  const fileToBlob = async (file: FileType): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([new Uint8Array(arrayBuffer)], {
          type: file.type,
        });
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      onClose={closeModal}
      footer={null}
      width={900}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={selectedItem ? selectedItem : {}}
        onFinish={handleFinishForm}
      >
        <div className={styles["form-grid-block"]}>
          <div className={`${styles["image-form-item"]} edit-item-image`}>
            {selectedItem && (
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
              >
                {selectedItem?.image ? (
                  <img
                    src={`data:image/jpeg;base64,${selectedItem?.image}`}
                    alt=""
                    width={300}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </div>
          <div>
            <Form.Item
              label="Название товара"
              name="name"
              rules={[{ required: true, message: "Введите название товара!" }]}
            >
              <Input placeholder="Название товара" />
            </Form.Item>
            <Form.Item
              label="Цена"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Введите цену на товар!",
                },
              ]}
            >
              <Input placeholder="Цена" />
            </Form.Item>
            <Form.Item label="Цена со скидкой" name="discountPrice">
              <Input placeholder="Цена со скидкой" />
            </Form.Item>
            <Form.Item
              label="На складе"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Введите кол-во товара на складе!",
                },
              ]}
            >
              <Input placeholder="Колличество на складе" />
            </Form.Item>
            <Form.Item
              label="Артикул"
              name="article"
              rules={[
                {
                  required: true,
                  message: "Введите артикул товара!",
                },
              ]}
            >
              <Input placeholder="Артикул" />
            </Form.Item>
          </div>
          <div>
            {/* <Form.Item label="Опция" name="optionName">
              <Select
                placeholder="Опция"
                options={selectOptions}
                onChange={setCurrentSelectOption}
              />
            </Form.Item>
            <Form.Item
              label={currentSelectOption === "color" ? "Цвет" : "Значение"}
              name="optionValue"
            >
              {currentSelectOption === "color" ? <ColorPicker /> : <Input />}
            </Form.Item> */}
            <Form.Item label="Популярный" name="isPopular">
              <Select
                options={[
                  {
                    label: "Популярный",
                    value: true,
                  },
                  {
                    label: "Непопулярный",
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Новинка" name="isNewItem">
              <Select
                options={[
                  {
                    label: "Новинка",
                    value: true,
                  },
                  {
                    label: "Не новинка",
                    value: false
                  }
                ]}
              />
            </Form.Item>
            <Form.Item label="Брэнд" name="brandId">
              <Select placeholder="Брэнд" options={brandsOptions} />
            </Form.Item>
            <Form.Item label="Категория" name="categoryId">
              <Select placeholder="Категория" options={categoriesOptions} />
            </Form.Item>
            <Form.Item label="Описание товара" name="description">
              <Input.TextArea
                placeholder="Описание товара"
                rows={7}
                autoSize={{ maxRows: 7, minRows: 7 }}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <div className={styles["button-block"]}>
            <Popconfirm
              title="Удалить"
              description="Вы уверены, что хотите удалить товар?"
              onConfirm={handleDelete.bind(this, selectedItem?.id ?? -1)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                color="danger"
                variant="solid"
                style={{
                  marginRight: "30%",
                }}
              >
                Удалить
              </Button>
            </Popconfirm>
            <Button onClick={closeModal}>Отменить</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
