import { Modal, notification, Skeleton, Tooltip } from "antd";

import styles from "./ProductModal.module.scss";
import MarkdownRenderer from "@/Components/MarkDown/MarkDownRenderer";
import { FC, useEffect, useState } from "react";
import { CardItemType } from "@/Types/CardType";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";
import { OrderForm } from "./OrderForm/OrderForm";
import { OrderItem } from "@/Types/OrderItem";
import { usePostOrderItem } from "@/hooks/usePostOrderItem";
// import { useAtom } from "jotai";
// import { isItemOpenedAtom } from "@/Store/OpenedItem";

type OpenProductCard = {
  state: boolean;
  id: number | null;
};

type ProductModalProps = {
  openProductCard: OpenProductCard;
  closeModal: () => void;
  CardData: CardItemType | undefined;
  handleAddToBucket: () => void;
};

export const ProductModal: FC<ProductModalProps> = ({
  CardData,
  closeModal,
  openProductCard,
  handleAddToBucket,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [openOrderForm, setOpenOrderForm] = useState(false);

  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, [])

  const [params, setParams] = useState(new URLSearchParams({
    config: "fc431351-6149-4431-9823-10e6998d8974",
    tradeID: "230107099000001",
    partnersURL: "https://parkmobile.store/",
  }));

  useEffect(() => {
    if(CardData && CardData.name) {
      const goods = [
        {
          quantity: 1,
          price: (CardData?.discountPrice ?? CardData?.price ?? -1) * 1.06,
          name: CardData?.name,
        }
      ];

      const newParams = new URLSearchParams(params.toString());
    
      goods.forEach((item, index) => {
        Object.entries(item).forEach(([key, value]) => {
          if(newParams.has(`goods[${index}][${key}]`)) {
            newParams.delete(`goods[${index}][${key}]`)
          }
          if(value && params.get(`goods[${index}][${key}]`) !== value) {
            newParams.append(`goods[${index}][${key}]`, value as string);
          }
        });
      });

      setParams(newParams);
    }
  }, [CardData]);
  
  const {
    postOrderItemAsync,
  } = usePostOrderItem();
  
  const computedCarDataNewPriceWithPercent = () => {
    if(CardData?.price) {
      const number = CardData?.discountPrice ? Math.ceil(CardData.discountPrice * 1.06 / 100) * 100 : Math.ceil(CardData?.price * 1.06 / 100) * 100;
      return convertToIntlFormat(number);
    }
  }

  const handleCloseModal = () => {
    // setIsItemOpened(false)
    closeModal();
  }
  
  const handleAddItem = () => {
    handleAddToBucket();
    // setIsItemOpened(false);
    
    api.destroy();

    api.open({
      message: "",
      description: (
        <div className={styles["information-title"]}>
          <strong>{CardData?.name} в корзине!</strong>
          <span>Перейдите в корзину для оформления заказа.</span>
        </div>
      ),
      style: {
        padding: "3%",
        border: "1px solid #87a08b",
        borderRadius: "5px"
      },
      placement: "bottomRight",
      closable: false,
      duration: 2,
      type: "success",
      // showProgress: true,
      pauseOnHover: true,
    })
  }
  
  const renderToolTipContent = () =>
    <div className={styles["tooltip-content"]}>
      <div>
        <strong>{CardData?.discountPrice ? convertToIntlFormat(CardData.discountPrice) : convertToIntlFormat(CardData?.price)} ₽</strong>
        <label>Цена действительна при оформлении заказа и оплате наличными денежными средствами</label>
      </div>
      <div>
        <strong>{computedCarDataNewPriceWithPercent()} ₽</strong>
        <label>Цена в розничных магазинах без оформления заказа на сайте и при оформлении онлайн кредита</label>
      </div>
    </div>

const [modalHeight, setModalHeight] = useState<number>(0);

useEffect(() => {
  if (openProductCard.state) {
    document.body.style.overflow = "hidden";
  }
  const handleResize = () => {
    const modalElement = document.querySelector(".ant-modal-body");
    if (modalElement) {
      const height = modalElement.clientHeight;
      setModalHeight(height);
    }
  };
  
  window.addEventListener("resize", handleResize);
  handleResize();
  
  return () => {
    window.removeEventListener("resize", handleResize);
    document.body.style.overflow = "auto";
  };
}, [openProductCard.state, CardData]);

const handleCreditPrice = () => {
  if(CardData?.price) {
    return CardData?.discountPrice ? convertToIntlFormat(((CardData.discountPrice * 1.31) / 36 + 1).toFixed()) : convertToIntlFormat(((CardData?.price * 1.31) / 36 + 1).toFixed())
  }
};

const handleSubmitData = async (values: Omit<OrderItem, "article" | "itemName">) => {
  const sendData = {...values, itemName: CardData?.name, article: CardData?.article};
  await postOrderItemAsync(sendData)
  setOpenOrderForm(false);
}

  return (
    <div>
      {contextHolder}
      <Modal
        open={openProductCard.state}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        centered={true}
        footer={null}
        title={null}
        closeIcon={
          isRendered && window.screen.width > 1024 ? null : (
            <i className="fa-solid fa-xmark" style={{ marginTop: "35px" }}/>
          )
        }
        className={styles["item-modal-window"]}
      >
        <div className={styles["item-container"]}>
          <div className={styles["item-container-image"]}>
            {
              CardData?.image ? 
              <Image
                src={
                  CardData && CardData.image
                    ? `data:image/jpeg;base64,${CardData.image}`
                    : ""
                }
                alt="product_card"
                width={500}
                height={500}
                quality={100}
                priority
                layout="relative"
              /> :
              <Skeleton.Image
                active
                style={(isRendered && window.screen.width > 1024) ? {
                  width:"400px",
                  height: "400px"
                } : 
                {
                  width: "150px",
                  height: "150px"
                }}
              />
            }
          </div>
          <div className={styles["item-container-data"]}>
            <header>
              {
                CardData ? 
                <>
                  <h3>{CardData?.name}</h3>
                  <title>{CardData?.brandName}</title>
                  <article>АРТИКУЛ: {CardData?.article}</article>
                </> :
                <Skeleton active/>
              }
            </header>
            <div className={styles["item-container-data-prices"]}>
              {
                CardData ?
                <>
                  <strong className={CardData?.discountPrice !== null ? styles["discount"] : ""}>
                    {convertToIntlFormat(CardData?.price)} ₽
                  </strong>
                  {CardData?.discountPrice && (
                    <strong>{convertToIntlFormat(CardData?.discountPrice)} ₽</strong>
                  )}
                </> :
                <Skeleton.Button active />
              }
            </div>
            <div className={styles["item-container-data-price-in-online"]}>
              {
                CardData ? 
                <>
                  <span>Цена в магазине:</span>
                  <strong>{computedCarDataNewPriceWithPercent()} ₽</strong>
                  <Tooltip
                    title={renderToolTipContent}
                    color="white"
                    overlayStyle={{
                      minWidth: (isRendered && window.screen.width >= 1024) ? "600px" : "auto",
                      margin:"0% 3%"
                    }}
                    overlayInnerStyle={{
                      color:"black",
                      border:"1px solid #87a08b"
                    }}
                  >
                    <i className="fa-regular fa-circle-question" style={{opacity:"0.5", cursor: "help"}}/>
                  </Tooltip>
                </> :
                <Skeleton.Button active />
              }
            </div>
            {
              CardData ? 
              <>
                <button
                  onClick={(CardData?.stock && CardData?.stock > 0) ? handleAddItem : setOpenOrderForm.bind(null, true)}
                  data-unstocked={(CardData?.stock && CardData?.stock > 0) ? false : true}
                >
                  {(CardData?.stock && CardData?.stock > 0) ? "Купить" : "Заказать"}
                </button>
                {CardData.stock && CardData.stock > 0 && (
                  <a
                    className={styles["item-container-data-credit-button"]}
                    href={`https://ecom.otpbank.ru/smart-form?${params.toString()}`}
                    target="_blank"
                  >
                    Купить в кредит
                  </a>
                )}
                <div className={styles["credit"]}>
                  <span>Доступно</span>
                  <a>в кредит</a>
                  <span>от {handleCreditPrice()} ₽/мес.</span>
                </div>
              </> :
              <Skeleton />
            }
            <div
              className={styles["MarkdownContent"]}
              style={{
                maxHeight: `${(isRendered && window.screen.width > 1024) ? modalHeight - 400 : modalHeight - (modalHeight * 0.85)}px`,
                overflow: "auto",
                padding: "0% 5% 0% 0%",
                textAlign: "justify"
              }}
            >
              <MarkdownRenderer content={CardData?.description ?? ""} />
            </div>
          </div>
        </div>
      </Modal>
      <OrderForm
        key={`${openOrderForm}`}
        open={openOrderForm}
        handleClose={setOpenOrderForm.bind(this,false)}
        submitData={handleSubmitData}
      />
    </div>
  );
};
