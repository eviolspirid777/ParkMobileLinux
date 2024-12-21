"use client";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import styles from "./Categories.module.scss";
import { useAtom } from "jotai";
import { categoryAtom } from "../../../Store/FiltersStore";

type CategoriesProps = {
  noAnimationHeight?: boolean;
};

export const Categories: FC<CategoriesProps> = ({
  noAnimationHeight = false,
}) => {
  const categoriesItems = [
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
    "Популярное",
  ];
  const [selectedValue, setSelectedValue] = useState(categoriesItems[0]);
  const [categories, setCategories] = useAtom(categoryAtom);

  const [breakAnimation, setBreakAnimation] = useState(false);

  useLayoutEffect(() => {
    setCategories("");
  }, []);

  useEffect(() => {
    if (!categories) {
      setSelectedValue(categoriesItems[0]);
    }
    if (categories) {
      setSelectedValue(categories);
      setBreakAnimation(true);
    }
  }, [categories]);

  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      switch (window.screen.width > 1024) {
        case true: {
          if (window.scrollY >= 2900) {
            setTimeout(() => {
              categoriesItems.forEach((_, index) => {
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
              categoriesItems.forEach((_, index) => {
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
    const newFilter = event.currentTarget.textContent ?? "";
    setSelectedValue(newFilter);
    setCategories(newFilter);
  };

  return (
    <div key={categories} className={styles["categories-block"]}>
      {categoriesItems.map((el, index) => (
        <span
          key={index}
          ref={(el) => {
            spanRefs.current[index] = el;
          }}
          data-no-animation={noAnimationHeight || breakAnimation}
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
  );
};
