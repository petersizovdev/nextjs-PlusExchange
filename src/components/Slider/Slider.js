"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import styles from "./Slider.module.css";

export default function App() {
  return (
    <div className={styles.slider}>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        className={styles.slider}
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>

          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="slide"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
