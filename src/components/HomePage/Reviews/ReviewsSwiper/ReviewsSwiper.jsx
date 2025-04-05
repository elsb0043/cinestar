import { Swiper, SwiperSlide } from 'swiper/react'  // Import af Swiper og SwiperSlide komponenterne fra Swiper-biblioteket
import { Autoplay, EffectCoverflow } from 'swiper/modules'  // Import af Swiper-moduler for autoplay og coverflow-effekt
import { useEffect, useState } from 'react'
import { useFetchReviews } from '../../../../hooks/useFetchReviews'  // Import af custom hook til at hente anmeldelser
import styles from './swiper.module.css'
import 'swiper/css/bundle'  // Import af Swiper's bundne CSS for korrekt funktion

function ReviewsSwiper() {
    const { reviews, fetchReviews } = useFetchReviews() // Destrukturering af reviews og fetchReviews fra custom hook
    
    const [reviewList, setReviewList] = useState([]) // useState hook til at opbevare en liste af anmeldelser

    // useEffect hook til at hente anmeldelser når komponenten mountes
    useEffect(() => {
        fetchReviews()  // Henter anmeldelser via fetchReviews funktionen fra hook'en
    }, [])  // Tomt afhængighedsarray, så det kun kører én gang når komponenten er mountet

    // useEffect hook til at tilpasse review-listen, hvis der er færre end 7 anmeldelser
    useEffect(() => {
        const extended = reviews.length < 7 ? [...reviews, ...reviews] : reviews  // Hvis der er færre end 7 anmeldelser, duplikeres de
        setReviewList(extended)  // Opdaterer reviewList til den udvidede liste
    }, [reviews])  // Denne effekt køres hver gang reviews ændres

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                modules={[Autoplay, EffectCoverflow]} // Moduler der er blevet aktiveret for at tilføje autoplay og coverflow effekt
                effect="coverflow" // Indstiller effekten til "coverflow"
                centeredSlides={true} // Centerer det aktuelle slide i visningen
                loop={reviews.length > 4} // Hvis der er mere end 4 anmeldelser, loop gennem slides
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay indstillinger: forsinkelse på 3 sekunder og stopper ikke ved brugerinteraktion
                slidesPerView="auto" // Antal slides der vises per visning er automatisk justeret
                spaceBetween={20} // Sætter afstanden mellem slides til 20px
                breakpoints={{
                    640: { slidesPerView: 2 }, // På skærme der er 640px bredde eller større, vis 2 slides
                    1024: { slidesPerView: 3 }, // På skærme der er 1024px bredde eller større, vis 3 slides
                }}
                coverflowEffect={{
                    rotate: 0, // Ingen rotation af slides i coverflow-effekten
                    stretch: 0, // Ingen strækning af slides
                    depth: 250, // Dybdeeffekt for coverflow
                    modifier: 1, // Modifikator til at ændre effekten af coverflow
                    slideShadows: false, // Deaktiverer slide-shadows i coverflow
                }}
            >
                {/* Mapper over reviewList og opretter et SwiperSlide for hvert review */}
                {reviewList.map((review, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <div className={styles.slideContent}>
                            {/* Visning af stjerner baseret på anmeldelsens rating */}
                            <div className={styles.rating}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}  {/* Udskriver stjerner og tomme stjerner afhængig af rating */}
                            </div>
                            <p className={styles.reviewText}>"{review.text}"</p>
                            <h3 className={styles.reviewerName}>{review.name}</h3>
                            <p className={styles.reviewerPosition}>{review.position}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ReviewsSwiper