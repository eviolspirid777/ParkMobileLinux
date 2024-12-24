import { useAtom } from "jotai";
import styles from "./UnderSwiperCards.module.scss";

import { categoryAtom } from "@/Store/FiltersStore";

import Image from "next/image";
import Link from "next/link";

export const UnderSwiperCards = () => {
  const [, setCategories] = useAtom(categoryAtom);

  const items = [
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.33.webp",
      tag: "iPhone",
      price: "47 990",
      category: "iPhone",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.43.webp",
      tag: "iPad",
      price: "37 990",
      category: "iPad",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.52.webp",
      tag: "Watch",
      price: "31 990",
      category: "Watch",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.10.01.webp",
      tag: "Macbook",
      price: "97 990",
      category: "Mac",
    },
  ];

  const handleToCategory = (category: string) => {
    setCategories(category);
  };

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <Link key={i} href="/#catalog" style={{textDecoration: "none", color: "black"}}>
          <div
            key={i}
            className={styles["cards-block-item"]}
            onClick={handleToCategory.bind(null, item.category)}
          >
            <Image src={item.image} alt="" width={150} height={150} layout="responsive"/>
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
