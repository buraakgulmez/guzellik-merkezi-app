import sliderImg from "../../images/Slider/slider-1.jpg";
import sliderImg2 from "../../images/Slider/slider-2.jpg";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slider.component.css";
import { Link } from "react-router-dom";

const SliderItem = () => {
  return (
    <div className="slider-container">
      <Swiper slidesPerView={1} className="slider-style">
        {[sliderImg, sliderImg2, sliderImg].map((img, i) => (
          <SwiperSlide key={i} className="slider-img">
            <img src={img} alt={`Slider Görsel ${i + 1}`} />
            <div className="slider-icerik">
              <h3 className="slider-baslik">Aura Güzellik Merkezi'ne Hoş Geldiniz</h3>
              <p className="slider-text">Profesyonel ekibimizle güzelliğinize güzellik katıyoruz.</p>
              <Link className="slider-btn" to="/randevu">
                Randevu Al
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderItem;
