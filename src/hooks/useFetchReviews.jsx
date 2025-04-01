import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchReviews = () => {
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE REVIEWS – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
    const fetchReviews = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/reviews")
            const data = await response.json()
            setReviews(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching reviews:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Refetch-funktion, der blot kalder FetchReviews
    const refetch = useCallback(() => {
        fetchReviews()
    }, [fetchReviews])


    // OPRET REVIEW
    const createReview = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/review", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af udtalelse")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // OPDATER REVIEW
    const updateReview = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/review", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af udtalelse")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // SLET REVIEW
    const deleteReview = async (params) => {

        try {
            await fetch (`http://localhost:3042/review/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            /* Filter all the reviews without the matching ID. */
            const filteredArray = reviews.filter((act) => act._id !== params)
            setReviews(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT REVIEW BASERET PÅ ID
    const fetchReviewById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
          const response = await fetch(`http://localhost:3042/review/${id}`)
    
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch review: ${errorText}`)
          }
    
          const review = await response.json()
          return review.data
        } catch (error) {
          setError(error.message)
          console.error("Error fetching review:", error)
        } finally {
          setIsLoading(false)
        }
      }
    
      useEffect(() => {
        fetchReviews()
      }, [])
    

      return {
        reviews,
        createReview,
        deleteReview,
        setReviews,
        fetchReviews,
        fetchReviewById,
        updateReview,
        isLoading,
        refetch,
        error,
      }
}

export { useFetchReviews }