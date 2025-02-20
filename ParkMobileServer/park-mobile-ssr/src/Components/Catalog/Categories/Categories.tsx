"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import styles from "./Categories.module.scss";
import { useAtom } from "jotai";
import { ItemsFiltersForMainMenu } from "@/Shared/FiltersData/Filters";
import { filterAtom } from "@/Store/Filter";

type CategoriesProps = {
  noAnimationHeight?: boolean;
};

const baseCategoriesItems = [
  "Все",
  "iPhone",
  "iPad",
  "Watch",
  "Mac",
  "Airpods",
  "Аксессуары",
  "Гаджеты",
  "Аудио",
  "Смартфоны",
  "Гейминг",
  "Красота и здоровье",
  "TV и Дом",
];

export const Categories: FC<CategoriesProps> = ({
  noAnimationHeight = false,
}) => {
  const [filters, setFilters] = useAtom(filterAtom);

  const [categories, setCategories] = useState(baseCategoriesItems);
  const [selectedValue, ] = useState(categories[0]);

  // const [breakAnimation, ] = useState(false);

  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      switch (window.screen.width > 1024) {
        case true: {
          if (window.scrollY >= 2900) {
            setTimeout(() => {
              baseCategoriesItems.forEach((_, index) => {
                const spanElement = spanRefs.current[index];
    
                if (spanElement) {
                  // Проверяем, не null ли элемент
                  gsap.fromTo(
                    spanElement,
                    {
                      opacity: 0,
                      y: 30,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.5,
                      ease: "power2.out",
                    }
                  );
                }
              });
            }, 400);
            window.removeEventListener("scroll", handleScroll);
          }
          break;
        }
        case false: {
          if (window.scrollY >= 1975) {
            setTimeout(() => {
              baseCategoriesItems.forEach((_, index) => {
                const spanElement = spanRefs.current[index];
    
                if (spanElement) {
                  // Проверяем, не null ли элемент
                  gsap.fromTo(
                    spanElement,
                    {
                      opacity: 0,
                      y: 30,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.5,
                      ease: "power2.out",
                    }
                  );
                }
              });
            }, 400);
            window.removeEventListener("scroll", handleScroll);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategory = (event: React.MouseEvent<HTMLSpanElement>) => {
    let newFilter = event.currentTarget.textContent ?? "";
    let newFilterAlias: string | undefined = undefined;

    switch (newFilter) {
      case "Watch":
        newFilter = "watches"
        break;
      case "Airpods":
        newFilter = "Airpods"
        newFilterAlias = "AirPods"
        break;
      case "Аксессуары":
        newFilter = "accessories"
        break;
      case "Аудио":
        newFilter = "Headphones"
        break;
      case "Гейминг":
        newFilter = "Gaming"
        break;
      case "Красота и здоровье":
        newFilter = "Dyson"
        break;
      case "Смартфоны":
        newFilter = "phones"
        break;
      case "Samsung":
        newFilter = "Samsung"
        break;
      case "Xiaomi":
        newFilter = "Xiaomi"
        break;
      case "Стайлеры":
        newFilterAlias = "styler"
        break;
      case "Фены":
        newFilterAlias = "hairdryer"
        break;
      case "Выпрямители":
        newFilterAlias = "rectifier"
        break;
      case "Пылесосы":
        newFilterAlias = "vacuumcleaner"
        break;
      case "Очистители воздуха":
        newFilterAlias = "airpurifiers"
        break;
    }
    const newCategories = ItemsFiltersForMainMenu.get(newFilter) ?? []
    setCategories(prev => newCategories ?? prev)
    setFilters(prev => Array.from(new Set([...prev, newFilterAlias ?? newFilter])))
  };

  const handleBackFilters = () => {
    if(filters.length > 0) {
      const lastFilter = filters.at(-2);
      console.log(lastFilter)
      let newCategories: string[];
      if(lastFilter) {
        newCategories = ItemsFiltersForMainMenu.get(lastFilter) as string[]
      } else {
        newCategories = baseCategoriesItems;
      }
      console.log(newCategories)
      setCategories(prev => newCategories ?? prev)
      setFilters(prev => prev.toSpliced(-1,1))
    }
  }

  return (
    <div
      className={styles["categories"]}
      style={filters.length > 0 ? {
        paddingLeft: "21.1%"
      } : {
        paddingLeft: "23%"
      }}
    >
      {
        filters.length > 0 &&
        <i
          className={`fa-solid fa-arrow-left fa-xl ${styles["backward"]}`}
          onClick={handleBackFilters}
        />
      }
      <div
        className={styles["categories-block"]}
      >
        {categories.map((el, index) => (
          <span
            key={index}
            ref={(el) => {
              spanRefs.current[index] = el;
            }}
            data-no-animation={noAnimationHeight || true}
            style={
              el === selectedValue
                ? {
                    backgroundColor: "#abbcae",
                    color: "white",
                  }
                : {}
            }
            onClick={handleCategory}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
};
