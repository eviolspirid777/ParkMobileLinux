import { Modal, notification, Tooltip } from "antd";
import { createPortal } from "react-dom";

import styles from "./ProductModal.module.scss";
import MarkdownRenderer from "@/Components/MarkDown/MarkDownRenderer";
import { FC, useEffect, useState } from "react";
import { CardItemType } from "@/Types/CardType";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";

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
  const [isClient, setIsClient] = useState(false);

  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, [])

  const computedCarDataNewPriceWithPercent = () => {
    const number = CardData?.discountPrice ? Math.round(parseInt(CardData.discountPrice) * 1.06) : Math.round(parseInt(CardData?.price ?? "") * 1.06);
    return convertToIntlFormat(number);
  }

  const handleAddItem = () => {
    handleAddToBucket();

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

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    // Получаем высоту при первом рендере
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, [openProductCard.state]); // Запускаем эффект при открытии/закрытии модального окна

  const handleCreditPrice = (price: string | undefined | number) => {
    if (typeof price == "string") {
      const _price = Number((price as string).split(" ").join(""));
      return ((_price * 1.31) / 36 + 1).toFixed();
    }
  };

  return createPortal(
    <div>
      {contextHolder}
      <Modal
        open={openProductCard.state}
        onCancel={closeModal}
        onClose={closeModal}
        centered={true}
        footer={null}
        title={null}
        closeIcon={
          isClient && window.screen.width > 1024 ? null : (
            <i className="fa-solid fa-xmark" />
          )
        }
        className={styles["item-modal-window"]}
      >
        <div className={styles["item-container"]}>
          <div className={styles["item-container-image"]}>
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
            />
          </div>
          <div className={styles["item-container-data"]}>
            <header>
              <h3>{CardData?.name}</h3>
              <title>{CardData?.brandName}</title>
              <article>АРТИКУЛ: {CardData?.article}</article>
            </header>
            <div className={styles["item-container-data-prices"]}>
              <strong className={CardData?.discountPrice && styles["discount"]}>
                {convertToIntlFormat(CardData?.price)} ₽
              </strong>
              {CardData?.discountPrice && (
                <strong>{convertToIntlFormat(CardData?.discountPrice)} ₽</strong>
              )}
            </div>
            <div className={styles["item-container-data-price-in-online"]}>
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
                <i className="fa-regular fa-circle-question" style={{opacity:"0.5"}}/>
              </Tooltip>
            </div>
            <button onClick={handleAddItem}>Купить</button>
            <div className={styles["credit"]}>
              <span>Доступно</span>
              <a>в кредит</a>
              <span>от {handleCreditPrice(CardData?.price)} ₽/мес.</span>
            </div>
            <div
              className={styles["MarkdownContent"]}
              style={{
                maxHeight: `${modalHeight - 500}px`,
                overflow: "auto",
              }}
            >
              <MarkdownRenderer content={CardData?.description ?? ""} />
            </div>
          </div>
        </div>
      </Modal>
    </div>,
    document.body
  );
};
