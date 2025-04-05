import styles from './reviews.module.css'
import ReviewsSwiper from './ReviewsSwiper/ReviewsSwiper'

function Reviews() {

    return (
        <div className={styles.reviewsContainer}>
            <div className={styles.reviewsContent}>
                <div className={styles.reviewsContentText}>
                    <h3>Udtalelser</h3>
                    <h2>Hvad siger vores samarbejdspartnere om os?</h2>
                    <p>“Cinestar er en fantastisk samarbejdspartner, der formår at kombinere kreativitet med professionalisme. Deres evne til at skabe unikke og engagerende produktioner er imponerende, og resultatet taler altid for sig selv.”</p>
                </div>
            </div>
            <ReviewsSwiper /> {/* Importerer Reviews slideren */}
        </div>
    )
}

export default Reviews