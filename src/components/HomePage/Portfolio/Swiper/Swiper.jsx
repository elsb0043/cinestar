import styles from "./swiper.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/swiper-bundle.css"
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"

function Slider() {
  const images = [
    { src: "/assets/daughter_mom.jpg" },
    { src: "/assets/into_your_heart.jpg" },
    { src: "/assets/school_life.jpg" },
  ]

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        style={{
            "--swiper-navigation-color": "#F29D38",
            "--swiper-pagination-color": "#F29D38",
            "--swiper-pagination-bullet-size": "2rem",
            "--swiper-pagination-bullet-inactive-color": "#C0C0C0",
            "--swiper-pagination-bullet-horizontal-gap": "0.8rem"
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        effect='slide'
        speed={1000}
        centeredSlides={true}
        pagination
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        className={styles.swiperContainer}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider