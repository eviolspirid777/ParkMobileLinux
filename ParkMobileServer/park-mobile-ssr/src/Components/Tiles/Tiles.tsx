"use client";
import gsap from "gsap";
import styles from "./Tiles.module.scss";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { categoryAtom } from "@/Store/FiltersStore";
import { animateScroll as scroll } from "react-scroll";

type TileItem = {
  title: string;
  description: string;
  img: string;
  key: string;
  category: string;
};

export const Tiles = () => {
  const tilesItems: TileItem[] = [
    {
      title: "Apple Watch",
      description: "Умнее. Ярче. Могущественнее",
      img: "/images/TilesImages/AppleWatchTile/appleWatchTileReviewed.png",
      category: "Watch",
      key: "1",
    },
    {
      title: "MacBook Pro",
      description: "Сногсшибательный. Вскружит голову.",
      img: "/images/TilesImages/MacBookTile/macBookReviewed.png",
      category: "Mac",
      key: "2",
    },
    {
      title: "iPad",
      description: "Твой следующий компьютер - не компьютер",
      img: "/images/TilesImages/IpadTile/ipadTileReviewed.png",
      category: "iPad",
      key: "3",
    },
    {
      title: "AirPods Pro",
      description: "Никаких проводов. Только магия звука.",
      img: "/images/TilesImages/AirpodsTile/PodsTileReviewed.png",
      category: "Airpods",
      key: "4",
    },
  ];

  const h2Refs = useRef<HTMLHeadingElement[]>([]);
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  const [, setCategories] = useAtom(categoryAtom);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1400) {
        tilesItems.forEach((_, index) => {
          const h2Element = h2Refs.current[index];
          const spanElement = spanRefs.current[index];
          const buttonElement = buttonRefs.current[index];

          if (h2Element && spanElement) {
            const delay = index * 0.5;

            gsap.fromTo(
              h2Element,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay,
              }
            );

            gsap.fromTo(
              spanElement,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay + 0.4,
              }
            );

            gsap.fromTo(
              buttonElement,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: delay + 0.7,
              }
            );
          }
        });

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategory = (category: string) => {
    scroll.scrollTo(window.screen.width > 1024 ? 3200 : 4200, {
      duration: 50,
      smooth: true,
    });

    setCategories(category);
  };

  return (
    <div className={styles["card-tiles-block"]}>
      {tilesItems.map((el, index) => (
        <div key={index} className={styles["card-item-block"]}>
          <h2
            ref={(el) => {
              h2Refs.current[index] = el!;
            }}
            data-image={el.key}
          >
            {el.title}
          </h2>
          <span
            ref={(el) => {
              spanRefs.current[index] = el!;
            }}
            data-image={el.key}
          >
            {el.description}
          </span>
          <img src={el.img} alt="" />
          <div
            className={styles["card-item-block-button-block"]}
            ref={(el) => {
              buttonRefs.current[index] = el!;
            }}
            data-buttons={el.key}
          >
            <button
              data-button="подробнее"
              onClick={handleCategory.bind(null, el.category)}
            >
              Подробнее
            </button>
            <button
              data-button="купить"
              onClick={handleCategory.bind(null, el.category)}
            >
              Купить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
