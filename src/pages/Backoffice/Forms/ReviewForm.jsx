import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useFetchReviews } from "../../../hooks/useFetchReviews"
import styles from "./form.module.css"
import Button2 from "../../../components/Button/Button2"

const ReviewForm = ({ isEditMode }) => {
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [text, setText] = useState("")
    const [rating, setRating] = useState("")
    const { refetch } = useOutletContext()
    const navigate = useNavigate()
    const { id } = useParams()
    const { createReview, fetchReviewById, updateReview } = useFetchReviews()

    // Hent udtalelsen hvis editMode er true
    useEffect(() => {
        if (isEditMode && id) {
            const loadReviewData = async () => {
                try {
                  const response = await fetchReviewById(id)
        
                  if (response) {
                    // Forudfyld formularen med udtalelsen data
                    setName(response.name)
                    setPosition(response.position)
                    setText(response.text)
                    setRating(response.rating)
                  }
                } catch (error) {
                  console.error("Error fetching review:", error)
                }
            }

            loadReviewData()
        }
    }, [])


    const handleSubmitReview = async (event) => {
        event.preventDefault()

        const reviewData = new FormData()
        reviewData.append("name", name)
        reviewData.append("position", position)
        reviewData.append("text", text)
        reviewData.append("rating", rating)

        try {
            let response
            if (isEditMode && id) {
                reviewData.append("id", id)
                response = await updateReview(reviewData)
            } else {
                response = await createReview(reviewData)
            }

            if (response) {
                await refetch()
                navigate("/backoffice/reviews")
            }
        } catch (error) {
            console.error("Fejl ved håndtering af udtalelse:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitReview} className={styles.form}>
            <h2>{isEditMode ? "Opdater udtalelse" : "Tilføj udtalelse"}</h2>
            <div>
                {/* 
                Når htmlFor-attributten på en <label> matcher id-attributten på et <input>-element, oprettes der en forbindelse mellem dem.
                Dette betyder, at når brugeren klikker på etiketten, bliver det tilknyttede inputfelt automatisk aktiveret eller fokuseret. 
                Dette gør både brugervenligheden og tilgængeligheden (accessibility) bedre
                */}
                <label htmlFor='name'>Navn:</label>
                <input
                    className={styles.backInput}
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='position'>Job:</label>
                <input
                    className={styles.backInput}
                    id='position'
                    type='text'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='text'>Udtalelse:</label>
                <input
                    className={styles.backInput}
                    id='text'
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='rating'>Rating (1-5):</label>
                <input
                    className={`${styles.backInput} ${styles.lastInput}`}
                    id='rating'
                    type='number'
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) && value >= 1 && value <= 5) {
                            setRating(String(value));
                        } else if (e.target.value === "") {
                            setRating("");
                        }
                    }}
                    required
                />
            </div>

            <Button2
                type='submit'
                buttonText={isEditMode ? "Opdater udtalelse" : "Tilføj udtalelse"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default ReviewForm