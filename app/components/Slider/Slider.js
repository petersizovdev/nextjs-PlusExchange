"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import styles from "./Slider.module.css";
import Promo1 from "../../../src/assetst/img/promo1.png";
import Promo2 from "../../../src/assetst/img/promo2.png";
import Promo3 from "../../../src/assetst/img/promo3.png";
import Image from "next/image";

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
        <SwiperSlide>
          <Image src={Promo1} quality="100" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Promo2} quality="100" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Promo3} quality="100" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
