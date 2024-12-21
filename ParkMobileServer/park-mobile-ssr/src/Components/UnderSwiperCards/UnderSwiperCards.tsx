import { useAtom } from "jotai";
import styles from "./UnderSwiperCards.module.scss";

import { animateScroll as scroll } from "react-scroll";
import { categoryAtom } from "@/Store/FiltersStore";

export const UnderSwiperCards = () => {
  const [, setCategories] = useAtom(categoryAtom);

  const items = [
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.33.png",
      tag: "iPhone",
      price: "47 990",
      category: "iPhone",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.43.png",
      tag: "iPad",
      price: "37 990",
      category: "iPad",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.09.52.png",
      tag: "Watch",
      price: "31 990",
      category: "Watch",
    },
    {
      image: "/images/Снимок экрана 2024-11-09 в 22.10.01.png",
      tag: "Macbook",
      price: "97 990",
      category: "Mac",
    },
  ];

  const handleToCategory = (category: string) => {
    scroll.scrollTo(window.screen.width > 1024 ? 3200 : 4200, {
      duration: 700,
      smooth: true,
    });

    setCategories(category);
  };

  return (
    <div className={styles["cards-block"]}>
      {items.map((item, i) => (
        <div
          key={i}
          className={styles["cards-block-item"]}
          onClick={handleToCategory.bind(null, item.category)}
        >
          <img src={item.image} alt="" />
          <div className={styles["cards-block-price-block"]}>
            <span className={styles["cards-block-item-tag"]}>{item.tag}</span>
            <span className={styles["cards-block-item-price"]}>
              От {item.price} ₽
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
