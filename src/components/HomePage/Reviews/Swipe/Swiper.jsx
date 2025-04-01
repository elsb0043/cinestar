import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { useFetchReviews } from '../../../../hooks/useFetchReviews'
import styles from './swiper.module.css'
import 'swiper/css/bundle'

function SwiperComp() {
    const { reviews, fetchReviews } = useFetchReviews()
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        fetchReviews()
    }, [])

    useEffect(() => {
        setReviewList(reviews.length >= 4 ? reviews : [...reviews, ...reviews])
    }, [reviews])

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                modules={[Autoplay, EffectCoverflow]}
                effect="coverflow"
                centeredSlides={true}
                loop={reviewList.length >= 4}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                slidesPerView="auto"
                spaceBetween={20}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                coverflowEffect={{
                    rotate: 0, 
                    stretch: 0,
                    depth: 250, 
                    modifier: 1,
                    slideShadows: false, 
                }}
            >
                {reviewList.map((review, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <div className={styles.slideContent}>
                            <div className={styles.rating}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
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

export default SwiperComp