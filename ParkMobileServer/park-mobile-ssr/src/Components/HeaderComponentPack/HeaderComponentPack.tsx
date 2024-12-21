"use client";
import { useEffect, useReducer, useState } from "react";
import Media from "react-media";
import { Header } from "../Header/Header";
import { HeaderSlider } from "../HeaderSlider/HeaderSlider";
import { ContentType } from "@/Types/SliderContentType";
import { useRouter } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";

import { ShopBucket } from "../ShopBucket/ShopBucket";
import { MobileHeader } from "../Header/MobileHeader/MobileHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchedItemsAtom } from "@/Store/SearchedItemsStore";
import { useAtom } from "jotai";

export type ReducerAction = {
  type?: ContentType;
  titles?: string[];
  subTitles?: string[];
  items?: { image: string; tag: string; price: string }[];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: unknown,
  { type, items, subTitles, titles }: ReducerAction
): ReducerAction => {
  return { type, items, subTitles, titles };
};

const navTitleDictionary = new Map([
  ["Apple", "Apple"],
  ["Samsung", "Samsung"],
  ["Xiaomi", "Xiaomi"],
  ["Dyson", "Dyson"],
  ["Акустика и гарнитура", "Headphones"],
  ["Гейминг", "Gaming"],
]);

export const HeaderComponentPack = () => {
  const navigate = useRouter();
  const queryClient = new QueryClient();

  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [sliderData, dispatch] = useReducer(reducer, {});
  const [category, setCategory] = useState("")

  const [searchedItems, setSearchedItems] = useAtom(searchedItemsAtom);

  const [open, setOpen] = useState(false);

  const handleMouseEnter = (
    type: ContentType,
    titles: string[] | undefined,
    subTitles: string[] | undefined
  ) => {
    setTimeout(() => {
      setIsHeaderMenuVisible(true);
      setIsContentVisible(true);
    }, 100);
    dispatch({ type, titles, subTitles });
  };

  const handleMouseLeave = () => {
    setIsContentVisible(false);
    setSearchedItems([]);
    setTimeout(() => {
      setIsHeaderMenuVisible(false);
    }, 800);
  };

  const handleRouteCategory = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const category = event.currentTarget.text;
    const selectedCategory = navTitleDictionary.get(category);
    navigate.push(`/categories/${selectedCategory}`);
    handleMouseLeave();
  };

  const handleMainMenu = () => {
    navigate.push("/");
    handleMouseLeave();
  };

  const handleShopBag = () => {
    setOpen((previousState) => !previousState);
  };

  useEffect(() => {
    scroll.scrollTo(0);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Media
          queries={{
            telephone: "(max-width: 1024px)",
            computer: "(min-width: 1025px)",
          }}
        >
          {(matches) => (
            <>
              {matches.computer ? (
                <>
                  <Header
                    mouseEnter={
                      searchedItems.length > 0 ? () => {} : handleMouseEnter
                    }
                    handleMouseClick={(event) => handleRouteCategory(event)}
                    handleMainMenuRoute={handleMainMenu}
                    handleMouseCategoryEnter={(event) => setCategory(event.currentTarget.text)}
                    handleShopBag={handleShopBag}
                  />
                  {isHeaderMenuVisible && (
                    <HeaderSlider
                      contentType={sliderData}
                      category={navTitleDictionary.get(category)}
                      handleMouseLeave={handleMouseLeave}
                      isContentVisible={isContentVisible}
                      handleIsContentVisible={handleMouseLeave}
                    />
                  )}
                  <ShopBucket open={open} handleShopBag={handleShopBag} />
                </>
              ) : (
                <>
                  <MobileHeader
                    handleMainMenuRoute={handleMainMenu}
                    handleShopBag={handleShopBag}
                  />
                  <ShopBucket open={open} handleShopBag={handleShopBag} />
                </>
              )}
            </>
          )}
        </Media>
      </QueryClientProvider>
    </>
  );
};
