import { useAtom } from "jotai";
import styles from "./UnderSwiperCards.module.scss";

import { categoryAtom } from "@/Store/FiltersStore";

import Image from "next/image";
import Link from "next/link";
import { accentColorAtom } from "@/Store/AccentColor";
import { useEffect, useState } from "react";

export const UnderSwiperCards = () => {
  const [, setCategories] = useAtom(categoryAtom);
  const [accentColor, ] = useAtom(accentColorAtom);
  const [isClientGenerated, setIsClientGenerated] = useState(false);
  useEffect(() => {
    setIsClientGenerated(true)
  }, [])

  const items = [
    {
      image: "/images/iphone.webp",
      tag: "iPhone",
      price: "47 990",
      category: "iPhone",
    },
    {
      image: "/images/ipad.webp",
      tag: "iPad",
      price: "37 990",
      category: "iPad",
    },
    {
      image: "/images/watch.webp",
      tag: "Watch",
      price: "31 990",
      category: "Watch",
    },
    {
      image: "/images/mac.webp",
      tag: "Macbook",
      price: "97 990",
      category: "Mac",
    },
  ];

  const handleToCategory = (category: string) => {
    setCategories(category);
  };

  const handleColorChange = () => {
    const selectedColor = accentColor
                            .split("")
                            .slice(0, accentColor.length - 1)
                            .join("") + ',0.5)'

    return selectedColor
  }

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <Link key={i} href="/#catalog" style={{textDecoration: "none", color: "black"}}>
          <div
            key={i}
            className={styles["cards-block-item"]}
            style={isClientGenerated && window.screen.width > 1024 ? {
              backgroundImage: `linear-gradient(to bottom, ${handleColorChange()} -10%, white 20%)`
            } : 
            [0,1].includes(i) ? {
              backgroundImage: `linear-gradient(to bottom, ${handleColorChange()} -10%, white 20%)`
            } : {}}
            onClick={handleToCategory.bind(null, item.category)}
          >
            <Image
              src={item.image}
              alt={item.tag}
              className={styles["image"]}
              width={500}
              height={500}
            />
            <div className={styles["cards-block-price-block"]}>
              <span className={styles["cards-block-item-tag"]}>{item.tag}</span>
              <span className={styles["cards-block-item-price"]}>
                От {item.price} ₽
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};