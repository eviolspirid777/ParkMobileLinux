"use client";
import gsap from "gsap";
import styles from "./Tiles.module.scss";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { categoryAtom } from "@/Store/FiltersStore";
import Image from "next/image"
import Link from "next/link";

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
      img: "/images/TilesImages/AppleWatchTile/appleWatchTileReviewed.webp",
      category: "Watch",
      key: "1",
    },
    {
      title: "MacBook Pro",
      description: "Сногсшибательный. Вскружит голову.",
      img: "/images/TilesImages/MacBookTile/macBookReviewed.webp",
      category: "Mac",
      key: "2",
    },
    {
      title: "iPad",
      description: "Твой следующий компьютер - не компьютер",
      img: "/images/TilesImages/IpadTile/ipadTileReviewed.webp",
      category: "iPad",
      key: "3",
    },
    {
      title: "AirPods Pro",
      description: "Никаких проводов. Только магия звука.",
      img: "/images/TilesImages/AirpodsTile/PodsTileReviewed.webp",
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
          <Image src={el.img} alt={el.title} width={500} height={500} layout="responsive"/>
          <div
            className={styles["card-item-block-button-block"]}
            ref={(el) => {
              buttonRefs.current[index] = el!;
            }}
            data-buttons={el.key}
          >
            <Link href="/#catalog">
              <button
                data-button="подробнее"
                onClick={handleCategory.bind(null, el.category)}
              >
                Подробнее
              </button>
            </Link>
            <Link href="/#catalog">
              <button
                data-button="купить"
                onClick={handleCategory.bind(null, el.category)}
              >
                Купить
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
