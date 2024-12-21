"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./CatalogHeader.module.scss";

export const CatalogHeader = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      switch (window.screen.width > 1024) {
        case true: {
          if (window.scrollY >= 2900) {
            if (spanRef.current && h3Ref.current) {
              gsap.fromTo(
                spanRef.current,
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
    
              gsap.fromTo(
                h3Ref.current,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  delay: 0.2,
                }
              );
            }
    
            window.removeEventListener("scroll", handleScroll);
          }
        }
        case false: {
          if (window.scrollY >= 1975) {
            if (spanRef.current && h3Ref.current) {
              gsap.fromTo(
                spanRef.current,
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
    
              gsap.fromTo(
                h3Ref.current,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  delay: 0.2,
                }
              );
            }
    
            window.removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles["catalog-header"]}>
      <span ref={spanRef}>Каталог</span>
      <h3 ref={h3Ref}>Выбирайте то, что по душе</h3>
    </div>
  );
};
