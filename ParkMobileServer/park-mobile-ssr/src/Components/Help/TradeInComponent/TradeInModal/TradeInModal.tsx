"use client";
import { ConfigProvider, Modal, StepProps, Steps, StepsProps } from "antd";
import { FC, useEffect, useState } from "react";

import styles from "./TradeInModal.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";
import { useAddTradeInRequest } from "@/hooks/useAddTradeInRequest";
import { FirstStep } from "./TradeInSteps/Model(FIRST)/FirstStep";
import { FifthStep } from "./TradeInSteps/Accumulator(fifth)/FifthStep";
import { ForthStep } from "./TradeInSteps/Appearance(forth)/ForthStep";
import { SecondStep } from "./TradeInSteps/Color(second)/SecondStep";
import { SixthStep } from "./TradeInSteps/Complect(sixth)/SixthStep";
import { EightsStep } from "./TradeInSteps/ContactData(eights)/EightsStep";
import { ThirdStep } from "./TradeInSteps/Memory(third)/ThirdStep";
import { SeventhStep } from "./TradeInSteps/Remonted(seventh)/SeventhStep";

type TradeInModalProps = {
  open: boolean;
  handleClose: () => void;
};

const stepsDictionary = new Map([
  [0, () => <FirstStep />],
  [1, () => <SecondStep />],
  [2, () => <ThirdStep />],
  [3, () => <ForthStep />],
  [4, () => <FifthStep />],
  [5, () => <SixthStep />],
  [6, () => <SeventhStep />],
  [7, () => <EightsStep />],
]);

export const TradeInModal: FC<TradeInModalProps> = ({ handleClose, open }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const { mutate } = useAddTradeInRequest();

  const [items, setItems] = useState<StepProps[]>([
    {
      title: "Модель",
      description: "",
    },
    {
      title: "Цвет",
      description: "",
    },
    {
      title: "Объем памяти",
      description: "",
    },
    {
      title: "Состояние",
      description: "",
    },
    {
      title: "Аккумулятор",
      description: "",
    },
    {
      title: "Комплектация",
      description: "",
    },
    {
      title: "Было в ремонте",
      description: "",
    },
    {
      title: "Контактная информация",
      description: "",
    },
  ]);

  const handleCloseModal = () => {
    setTradeInStore({});
    handleClose();
  };

  const handleChangeStep = (state: "next" | "previous") => {
    if (currentStep === 0 && state === "previous") {
      if (isRendered && !window.confirm("Вы действительно хотите выйти?")) {
        return;
      }
      handleCloseModal();
      return;
    }
    if (currentStep === 7 && state === "next") {
      if (tradeInStore) {
        mutate(tradeInStore);
      }
      handleCloseModal();
      return;
    }

    setItems((prev) => {
      return prev.map((el, index, array) => {
        if (index === currentStep) {
          switch (state) {
            case "next": {
              el.status = "finish";
              array[index + 1].status = "process";
              break;
            }
            case "previous": {
              el.status = "wait";
              array[index - 1].status = "process";
              break;
            }
          }
        }
        return el;
      });
    });
    setCurrentStep((previousState) => {
      return state === "next" ? previousState + 1 : previousState - 1;
    });
  };

  const handleDisabled = () => {
    switch (currentStep) {
      case 0: {
        return !tradeInStore?.deviceType;
      }
      case 1: {
        return !tradeInStore?.color;
      }
      case 2: {
        return !tradeInStore?.memory;
      }
      case 3: {
        return !tradeInStore?.appearance;
      }
      case 4: {
        return !tradeInStore?.accumulator;
      }
      case 5: {
        return !tradeInStore?.complectation;
      }
      case 6: {
        return !tradeInStore?.remonted;
      }
      case 7: {
        return !(tradeInStore?.telephone && tradeInStore?.username);
      }
      default:
        return false;
    }
  };

  const handleDisplayDataAttributes = () => {
    if (isRendered && window.screen.width < 1024) {
      return { size: "small", progressDot: true } as StepsProps;
    }
    return { size: "default", progressDot: false } as StepsProps;
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      onCancel={handleCloseModal}
      closable={false}
      width="100%"
      centered={true}
      footer={null}
    >
      <div className={styles["trade-in-modal-content"]}>
        <div className={styles["steps"]}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#87a08b",
              },
            }}
          >
            <Steps items={items} {...handleDisplayDataAttributes()} />
          </ConfigProvider>
        </div>
        <div className={styles["content"]}>
          {stepsDictionary.get(currentStep)!()}
        </div>
        <div className={styles["button-block"]}>
          <button onClick={handleChangeStep.bind(this, "previous")}>
            {currentStep === 0 ? (
              <>
                <span>Выйти</span>
              </>
            ) : (
              <>
                <i className="fa-thin fa-arrow-left" />
                &nbsp; <span>Назад</span>
              </>
            )}
          </button>
          <button
            className={styles["next-step-button"]}
            disabled={handleDisabled()}
            onClick={handleChangeStep.bind(this, "next")}
          >
            {currentStep === 7 ? (
              <>
                <span>Отправить</span>
              </>
            ) : (
              <>
                <span>Далее</span> &nbsp;
                <i className="fa-thin fa-arrow-right" />
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
