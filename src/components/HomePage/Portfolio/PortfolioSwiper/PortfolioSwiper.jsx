import styles from "./swiper.module.css" 
import { Swiper, SwiperSlide } from "swiper/react" // Import af Swiper og SwiperSlide komponenter fra Swiper-biblioteket
import { Autoplay, Navigation, Pagination } from "swiper/modules" // Import af de nødvendige Swiper-moduler for autoplay, navigation og pagination
import "swiper/css" // Import af Swiper's grundlæggende CSS
import "swiper/swiper-bundle.css" // Import af Swiper bundle CSS
import "swiper/css/effect-coverflow" // Import af Coverflow-effektens CSS
import "swiper/css/autoplay" // Import af autoplay CSS

function PortfolioSwiper() {
  // Definerer et array med billed-URLs, som Swiper vil vise i slides
  const images = [
    { src: "/assets/daughter_mom.jpg" }, 
    { src: "/assets/into_your_heart.jpg" }, 
    { src: "/assets/school_life.jpg" }, 
  ]

  return (
    <>
      {/* Swiper komponenten bruges til at oprette et billede-galleri */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]} // Aktiverer de nødvendige moduler for autoplay, navigation og pagination
        navigation // Aktiverer navigation (pil-knapper) til at navigere mellem slides
        style={{
            "--swiper-navigation-color": "#F29D38", // Sætter navigationens farve
            "--swiper-pagination-color": "#F29D38", // Sætter paginationens farve
            "--swiper-pagination-bullet-size": "2rem",  // Sætter størrelsen på paginationens bullets
            "--swiper-pagination-bullet-inactive-color": "#C0C0C0", // Sætter inaktive bullets' farve
            "--swiper-pagination-bullet-horizontal-gap": "0.8rem" // Sætter afstanden mellem paginationens bullets horisontalt
        }}
        autoplay={{
          delay: 2000, // Sætter forsinkelsen mellem hver automatisk slide (2 sekunder)
          disableOnInteraction: false, // Sørger for, at autoplay ikke stopper, når brugeren interagerer med swiper
        }}
        effect='slide' // Vælger "slide"-effekten for swiper
        speed={1000} // Sætter hastigheden for swipe-effekten til 1000 millisekunder (1 sekund)
        centeredSlides={true} // Centerer det aktuelle slide i visningen
        pagination // Aktiverer pagination (sideindikatorer nederst)
        loop={true} // Aktiverer loop, så swiper begynder forfra, når den når slutningen
        coverflowEffect={{
          rotate: 0, // Ingen rotation på slides
          stretch: 0, // Ingen strækning på slides
          depth: 200, // Dybde af coverflow-effekten
          modifier: 1.5, // Modifierer effekten af coverflow (forstørrer effekten)
          slideShadows: false, // Deaktiverer slide-skærmeffekter
        }}
        className={styles.swiperContainer} // Tilføjer en CSS-klasse for styling
      >
        {/* Mapper billederne og skaber et SwiperSlide for hvert billede */}
        {images.map((img, index) => (
          <SwiperSlide key={index}>  {/* Hver SwiperSlide får et unikt key baseret på index */}
            <img src={img.src} alt={`Slide ${index + 1}`} />  {/* Billedet vises i hver slide */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PortfolioSwiper