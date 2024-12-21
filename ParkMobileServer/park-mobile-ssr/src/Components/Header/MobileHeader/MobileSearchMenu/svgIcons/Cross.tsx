import { FC } from "react";
import styles from "./Cross.module.scss";

type CrossProps = {
  onClick?: () => void;
};

export const Cross: FC<CrossProps> = ({ onClick }) => {
  return (
    <svg
      className={styles["cross"]}
      onClick={onClick?.bind(this)}
      role="presentation"
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.754014 27.4806L27.0009 1.32294" stroke="black" />
      <path d="M26.9688 27.5665L0.757956 1.39984" stroke="black" />
    </svg>
  );
};
