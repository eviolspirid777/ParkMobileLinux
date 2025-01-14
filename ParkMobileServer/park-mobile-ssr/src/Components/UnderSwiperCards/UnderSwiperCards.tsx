import { useAtom } from "jotai";
import styles from "./UnderSwiperCards.module.scss";

import { categoryAtom } from "@/Store/FiltersStore";

import Image from "next/image";
import Link from "next/link";

export const UnderSwiperCards = () => {
  const [, setCategories] = useAtom(categoryAtom);

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

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <Link key={i} href="/#catalog" style={{textDecoration: "none", color: "black"}}>
          <div
            key={i}
            className={styles["cards-block-item"]}
            onClick={handleToCategory.bind(null, item.category)}
          >
            <Image
              src={item.image}
              alt={item.tag}
              width={500}
              height={500}
              style={item.tag === "iPad" ? {
                height: "195px",
                width: "200px"
              } : item.tag === "Macbook" ? {
                height: "190px",
                width: "290px"
              } : item.tag === "iPhone" ? {
                width: "250px",
                height: "180px"
              } : {}}
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
