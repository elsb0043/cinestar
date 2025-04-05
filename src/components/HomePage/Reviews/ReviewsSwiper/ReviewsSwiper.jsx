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
                modules={[Autoplay, EffectCoverflow]}
                effect="coverflow" 
                centeredSlides={true}
                loop={reviews.length > 4} // Loop slides, hvis der findes mere end 4 anmeldelser
                autoplay={{ delay: 3000, disableOnInteraction: false }} 
                slidesPerView="auto" // Tillad Swiper at automatisk justere slides baseret på deres indholdsstørrelse
                spaceBetween={20} // Standard mellemrum mellem slides på mobil
                breakpoints={{
                    0: {
                    slidesPerView: "auto",
                    spaceBetween: 20, // Mellemrum mellem slides på mobil
                    },
                    768: {
                    slidesPerView: "auto",
                    spaceBetween: 60, // Mere plads mellem slides på desktop
                    },
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 250, // Dybde af coverflow-effekten
                    modifier: 1,
                    slideShadows: false,
                }}
                >
                {/* Mapper over reviewList og opretter et SwiperSlide for hvert review */}
                {reviewList.map((review, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                    <div className={styles.slideContent}>
                        <div className={styles.rating}>
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} {/* Udskriver stjerner og tomme stjerner afhængig af rating */}
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