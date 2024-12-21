import React, { FC, ReactNode } from "react";
import styles from "./AccordionComponent.module.scss";

type AccordionComponentType = {
  data: (string | ReactNode)[][];
};

export const AccordionComponent: FC<AccordionComponentType> = ({ data }) => {
  return (
    <>
      {data.map((el, index) => (
        <details key={index} className={styles["faq__detail"]}>
          <summary className={styles["faq__summary"]}>
            <span className={styles["faq__question"]}>{el[0]}</span>
          </summary>
          <p className={styles["faq__text"]}>{el[1]}</p>
        </details>
      ))}
    </>
  );
};
