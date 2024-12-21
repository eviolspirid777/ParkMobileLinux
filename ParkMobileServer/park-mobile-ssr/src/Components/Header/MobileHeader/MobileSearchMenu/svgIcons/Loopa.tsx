import styles from "./Loopa.module.scss";

export const Loopa = () => {
  return (
    <svg
      className={styles["loopa"]}
      role="presentation"
      width="40"
      height="40"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="7.93388"
        transform="matrix(0.715639 0.698471 -0.715639 0.698471 18.5859 11.7816)"
        stroke-width="1.0"
        stroke="#b6b6b6"
      />
      <line
        y1="-0.5"
        x2="9.17531"
        y2="-0.5"
        transform="matrix(-0.715635 0.698474 -0.715635 -0.698474 12.75 16.9609)"
        stroke-width="1.0"
        stroke="#b6b6b6"
      />
    </svg>
  );
};
