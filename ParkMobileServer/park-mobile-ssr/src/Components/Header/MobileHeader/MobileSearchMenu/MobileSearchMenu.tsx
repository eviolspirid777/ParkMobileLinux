"use client";
import { SliderSearchCard } from "@/Components/HeaderSlider/SliderSearch/SliderSearchCard/SliderSearchCard";
import styles from "./MobileSearchMenu.module.scss";
import { Cross } from "./svgIcons/Cross";
import { Loopa } from "./svgIcons/Loopa";
import { useGetSearchItems } from "@/hooks/useGetSearchItems";
import { useGetItemById } from "@/hooks/useGetItemById";
import { ProductModal } from "@/Components/Catalog/Products/ProductModal/ProductModal";
import { FC, useEffect, useRef, useState } from "react";
import { SearchItemShortType } from "@/Types/SearchItemShortType";
import { useAtom } from "jotai";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { debounce } from "lodash";

type MobileSearchMenuProps = {
  isOpened: boolean;
  handleCloseSearch: () => void;
};

export const MobileSearchMenu: FC<MobileSearchMenuProps> = ({
  isOpened,
  handleCloseSearch,
}) => {
  const { mutateSearchedItems, searchedItems } = useGetSearchItems();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState("");

  const { cardData, mutate } = useGetItemById();

  const [openProductCard, setOpenProductCard] = useState<{
    state: boolean;
    id: number | null;
  }>({ state: false, id: null });

  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);

  const handleAddToBucket = () => {
    if (cardData && Array.isArray(shopBucket)) {
      setShopBucket((previousShopBucket) => {
        if (previousShopBucket.some((item) => item.id === cardData.id)) {
          const newData = previousShopBucket.map((element) => {
            if (element.id === cardData.id) {
              return { ...element, count: element.count + 1 };
            }
            return element;
          });

          return newData;
        }

        return [
          ...previousShopBucket,
          {
            id: cardData.id!,
            name: cardData.name!,
            article: cardData.article!,
            count: 1,
            image: cardData.image!,
            price: cardData.price!,
            discountPrice: cardData.discountPrice ?? "",
          },
        ];
      });
      setOpenProductCard({ id: null, state: false });
    }
  };

  const handleSelectedItem = (item: SearchItemShortType) => {
    if (item.id) {
      mutate(item.id);
      setOpenProductCard((prevState) => ({ ...prevState, state: true }));
    }
  };

  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skip, setSkip] = useState(0);
  const take = 5;

  const handleInputChange = debounce(async (value: string) => {
    setInputValue(value);
    await mutateSearchedItems({ tag: value, skip: skip, take: take });
  }, 700);

  useEffect(() => {
    if (inputValue) {
      mutateSearchedItems({ tag: inputValue, skip: skip, take: take });
    }
  }, [skip]);

  const handlePageClick = (page: number) => {
    const newSkip = (page - 1) * take;
    setCurrentPage(page);
    setSkip(newSkip);
  };

  useEffect(() => {
    totalCount();
  }, [searchedItems]);

  const totalCount = () => {
    if (searchedItems?.count) {
      const totalPages = Math.ceil(searchedItems?.count / take);
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
    }
  };

  useEffect(() => {
    const _html = document.documentElement; // Изменяем html
    const _body = document.body;

    if (isOpened) {
      _html.style.overflow = "hidden"; // Отключаем скролл на html
      _body.style.overflow = "hidden"; // Отключаем скролл на body
    } else {
      _html.style.overflow = "visible"; // Включаем скролл на html
      _body.style.overflow = "visible"; // Включаем скролл на body
    }

    return () => {
      _html.style.overflow = "visible"; // Сбрасываем стили при размонтировании
      _body.style.overflow = "visible"; // Сбрасываем стили при размонтировании
      setInputValue("");
    };
  }, [isOpened]);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleInputChange("");
      handleCloseSearch();
    }
  };

  return (
    <div className={styles["mobile-search"]}>
      <div className={styles["mobile-search-container"]}>
        <Loopa />
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск"
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <Cross onClick={handleClearInput} />
      </div>
      <div className={styles["search-items-block-container"]}>
        {searchedItems?.items && (
          <span>Найдено результатов: {searchedItems?.count}</span>
        )}
        <div className={styles["search-items-block-container-data"]}>
          {searchedItems?.items?.map((item, index) => (
            <SliderSearchCard
              key={index}
              card={item}
              onClick={handleSelectedItem}
            />
          ))}
        </div>
        <ProductModal
          CardData={cardData}
          openProductCard={openProductCard}
          handleAddToBucket={handleAddToBucket}
          closeModal={setOpenProductCard.bind(this, {
            state: false,
            id: null,
          })}
        />
        {inputValue && searchedItems && (
          <div className={styles["pagination-block"]}>
            {pages.map((el) => (
              <div
                key={el}
                className={`${styles["pagination-block-item"]} ${
                  currentPage === el ? styles.selected : ""
                }`}
                onClick={() => handlePageClick(el)}
              >
                {el}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
