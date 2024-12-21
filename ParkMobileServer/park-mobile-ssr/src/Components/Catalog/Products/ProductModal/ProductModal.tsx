import { Modal } from "antd";
import { createPortal } from "react-dom";

import styles from "./ProductModal.module.scss";
import MarkdownRenderer from "@/Components/MarkDown/MarkDownRenderer";
import { FC, useEffect, useState } from "react";
import { CardItemType } from "@/Types/CardType";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [modalHeight, setModalHeight] = useState<number>(0);

  useEffect(() => {
    if (openProductCard.state) {
      document.body.style.overflow = "hidden";
    }
    const handleResize = () => {
      const modalElement = document.querySelector(".ant-modal-body"); // Получаем элемент модального окна
      if (modalElement) {
        const height = modalElement.clientHeight; // Получаем высоту модального окна
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
            <img
              src={
                CardData && CardData.image
                  ? `data:image/jpeg;base64,${CardData.image}`
                  : ""
              }
              alt=""
            />
          </div>
          <div className={styles["item-container-data"]}>
            <header>
              <h3>{CardData?.name}</h3>
              <title>{CardData?.brandName}</title>
              <article>АРТИКУЛ</article>
            </header>
            <div className={styles["item-container-data-prices"]}>
              <strong className={CardData?.discountPrice && styles["discount"]}>
                {CardData?.price} ₽
              </strong>
              {CardData?.discountPrice && (
                <strong>{CardData?.discountPrice} ₽</strong>
              )}
            </div>
            <button onClick={handleAddToBucket}>Купить</button>
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
