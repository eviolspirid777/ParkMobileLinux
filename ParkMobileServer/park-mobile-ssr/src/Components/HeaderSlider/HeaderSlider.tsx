"use client";
import { FC, useEffect, useState } from "react";
import styles from "./HeaderSlider.module.scss";
import { SliderMenu } from "./SliderMenu/SliderMenu";
import { SliderSearch } from "./SliderSearch/SliderSearch";
import { CardType } from "@/Types/CardType";
import { ReducerAction } from "../HeaderComponentPack/HeaderComponentPack";
import { SliderSearchCard } from "./SliderSearch/SliderSearchCard/SliderSearchCard";
import { useGetSearchItems } from "@/hooks/useGetSearchItems";
import { debounce } from "lodash";
import { ProductModal } from "../Catalog/Products/ProductModal/ProductModal";
import { SearchItemShortType } from "@/Types/SearchItemShortType";
import { useGetItemById } from "@/hooks/useGetItemById";
import { useAtom } from "jotai";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { TradeInModal } from "../Help/TradeInComponent/TradeInModal/TradeInModal";
import { RepairModal } from "../Help/RepairModal/RepairModal";
import { RepairRequestType, useAddRepairRequest } from "@/hooks/useAddRepairRequest";

type HeaderSliderProps = {
  isContentVisible: boolean;
  handleIsContentVisible: () => void;
  handleMouseLeave: () => void;
  contentType: ReducerAction;
  category: string | undefined,
};

export const HeaderSlider: FC<HeaderSliderProps> = ({
  handleMouseLeave,
  isContentVisible,
  handleIsContentVisible,
  contentType,
  category,
}) => {
  const { mutateSearchedItems, searchedItems, isSearchedItemsSuccess } =
    useGetSearchItems();

  const {mutateAsync} = useAddRepairRequest();

  const handleSubmitData = async (values: RepairRequestType) => {
    await mutateAsync(values);
  }

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "scroll",
      () => {
        handleIsContentVisible();
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  }, []);

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
  const take = 20;

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

  const [deviceFixOpen, setDeviceFixOpen] = useState(false);
  const [tradeInOpen, setTradeInOpen] = useState(false);

  const handleDeviceFix = () => {
    setDeviceFixOpen(prev => !prev);
  }

  const handleTradeIn = () => {
    setTradeInOpen(prev => !prev);
  }

  useEffect(() => {
    totalCount();
  }, [searchedItems]);

  const totalCount = () => {
    if (searchedItems?.count) {
      const totalPages = Math.ceil(searchedItems?.count / 24);
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => (inputValue ? {} : handleMouseLeave())}
        className={`${
          styles[`blur-block-${isContentVisible ? "visible" : "invisible"}`]
        } ${inputValue && searchedItems && styles["has-value-bg"]}`}
      >
        <div className={styles["search-items-block-container"]}>
          <span>Найдено результатов: {searchedItems?.count}</span>
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
      <div
        id="blur-block"
        className={`${
          styles[
            `blur-block-content-${isContentVisible ? "visible" : "invisible"}`
          ]
        } ${inputValue && searchedItems && styles["has-value"]}`}
      >
        {contentType.type === "menu" ? (
          <SliderMenu
            items={contentType.items as unknown as CardType[]}
            subTitles={contentType.subTitles}
            titles={contentType.titles}
            category={category}
            handleDeviceFix={handleDeviceFix}
            handleTradeIn={handleTradeIn}
          />
        ) : (
          <SliderSearch
            onInputChange={handleInputChange}
            isSuccess={isSearchedItemsSuccess}
            foundItemsCount={searchedItems?.count ?? 0}
          />
        )}
      </div>
      <TradeInModal
        key={`${tradeInOpen}`}
        handleClose={setTradeInOpen.bind(this, false)}
        open={tradeInOpen}
      />
      <RepairModal
        key={`${deviceFixOpen}`}
        handleClose={setDeviceFixOpen.bind(this, false)}
        submitData={handleSubmitData}
        open={deviceFixOpen}
      />
    </>
  );
};
