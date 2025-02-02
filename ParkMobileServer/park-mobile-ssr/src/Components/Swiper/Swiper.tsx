"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ColorThief from "colorthief";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Swiper.module.scss";
import ImageData from "next/image";
import { accentColorAtom } from "@/Store/AccentColor";
import { useAtom } from "jotai";
import { useGetSliderData } from "@/hooks/useGetSliderData";
import { useGetSliderDataMobile } from "@/hooks/useGetSliderDataMobile";


export const SwiperList = () => {
  const [images, setImages] = useState<string[]>([]);
  const [accentColor, setAccentColor] = useAtom(accentColorAtom)
  const [isRendered, setIsRendered] = useState(false);

  const {
    sliderData,
    getSliderDataAsync,
  } = useGetSliderData();

  const {
    mobileSliderData,
    getMobileSliderDataAsync,
  } = useGetSliderDataMobile();

  useEffect(() => {
    setIsRendered(true)
  }, [])

  useEffect(() => {
    const getSliderData = async () => {
      if(isRendered) {
        if(window.screen.width > 1024) {
          await getSliderDataAsync()
        }
        else {
          await getMobileSliderDataAsync()
        }
      }
    }

    getSliderData();
  }, [isRendered]);

  useEffect(() => {
    if(mobileSliderData) {
      setImages(mobileSliderData.map(data => data.imageData))
    }
    else if(sliderData) {
      setImages(sliderData.map(data => data.imageData))
    }
  }, [mobileSliderData, sliderData])

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const currentIndex = swiper.realIndex;
    const currentImage = images[currentIndex];

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = `data:image/jpeg;base64,${currentImage}`;

    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setAccentColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  };

  useEffect(() => {
    if(accentColor) {
      setAccentColor(accentColor)
    }
  }, [accentColor]);

  return (
    <div style={{ backgroundColor: accentColor || "transparent" }}>
      {
        images.length > 0 ?
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          {images.length > 0 && images.map((image, index) => (
            <SwiperSlide key={index}>
              <ImageData
                className={styles["image-container"]}
                src={`data:image/jpeg;base64,${image}`}
                alt="swiper_image"
                width={1200}
                height={300}
                quality={100}
                layout="relative"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        :
        <div
          style={{
            minHeight: "400px"
          }}
        />
      }
    </div>
  );
};