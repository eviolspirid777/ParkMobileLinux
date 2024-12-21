import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Loading.module.scss";

export const LoadingComponent = () => {
  return (
    <div className={styles["loading-container"]}>
      <LoadingOutlined style={{ fontSize: "48px" }} />
    </div>
  );
};
