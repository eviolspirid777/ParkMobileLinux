"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./SliderSearch.module.scss";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";

type SliderSearchProps = {
  onInputChange: (values: string) => void;
  isSuccess: boolean;
  isError?: boolean;
  foundItemsCount: number;
};

export const SliderSearch: FC<SliderSearchProps> = ({
  onInputChange,
  isSuccess,
  foundItemsCount,
}) => {
  const items = [
    "iPhone 16 PRO MAX",
    "Apple Vision Pro",
    "iPhone 14",
    "MacBook PRO 14 2024",
    "iPad PRO 2024",
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onInputChange(event.target.value);
  };

  const handleFamousItem = (item: string) => {
    setSearchValue(item);
    onInputChange(item);
    if(inputRef.current) {
      inputRef.current.value = item;
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    inputRef.current?.addEventListener(
      "focus",
      () => {
        const searchElement = document.getElementById("btn-srch");
        if (searchElement && inputRef.current) {
          searchElement.style.color = "#aab974";
          inputRef.current.style.borderBottom = "1px solid #aab974";
        }
      },
      {
        signal: controller.signal,
      }
    );

    inputRef.current?.addEventListener(
      "focusout",
      () => {
        const searchElement = document.getElementById("btn-srch");
        if (searchElement && inputRef.current) {
          searchElement.style.color = "#a2a2a2";
          inputRef.current.style.borderBottom = "1px solid #a2a2a2";
        }
      },
      {
        signal: controller.signal,
      }
    );

    return () => controller.abort();
  }, [inputRef.current]);

  return (
    <div className={styles["search-block"]}>
      <div className={styles["search-box"]}>
        <button id="btn-srch" className={styles["btn-search"]}>
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          ref={inputRef}
          className={styles["input-search"]}
          placeholder="Поиск PARK MOBILE..."
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles["loading-block"]} ${
          searchValue !== "" ? styles["block"] : styles["none"]
        }`}
      >
        {!isSuccess && <LoadingComponent />}
      </div>
      <div
        className={`${styles["popular-items-block"]} ${
          searchValue !== "" && styles["invisible"]
        }`}
        style={{
          display: foundItemsCount > 0 ? "none" : "flex"
        }}
      >
        <h3 className={styles["search-most-famous-header"]}>
          Самое популярное...
        </h3>
        <ul className={styles["search-most-famous"]}>
          {items.map((el, index) => (
            <li
              key={index}
              onClick={handleFamousItem.bind(this, el)}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
