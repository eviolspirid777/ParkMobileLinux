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
import { SliderResponse } from "@/Types/SliderResponse";

import { useRouter } from "next/navigation";


export const SwiperList = () => {
  const [images, setImages] = useState<SliderResponse[]>([]);
  const [accentColor, setAccentColor] = useAtom(accentColorAtom)
  const [isRendered, setIsRendered] = useState(false);
  const naviagate = useRouter();

  const handleCategory = (path: string) => {
    naviagate.push(path);
  };

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
      setImages(mobileSliderData)
    }
    else if(sliderData) {
      setImages(sliderData)
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

  const handleImageClick = (image: SliderResponse) => {
    switch(image.name) {
      case "Ipad":
      case "IpadMobile": {
        handleCategory("/categories/Apple/iPad");
        break;
      }
      case "Iphone":
      case "IphoneMobile": {
        handleCategory("/categories/Apple/iPhone/iPhone%2016");
        break;
      }
      case "iphoneWIthGlass":
      case "iphoneWIthGlassMobile": {
        handleCategory("/categories/Apple/iPhone");
        break;
      }
    }
  };

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
                src={`data:image/jpeg;base64,${image.imageData}`}
                alt="swiper_image"
                width={1200}
                height={300}
                quality={100}
                layout="relative"
                priority
                onClick={() => handleImageClick(image)}
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