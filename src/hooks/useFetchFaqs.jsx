import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchFaqs = () => {
    const [faqs, setFaqs] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE FAQS – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
    const fetchFaqs = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/faqs")
            const data = await response.json()
            setFaqs(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching faqs:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Refetch-funktion, der blot kalder fetchFaqs
    const refetch = useCallback(() => {
        fetchFaqs()
    }, [fetchFaqs])


    // OPRET FAQ
    const createFaq = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/faq", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af faq")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved faq:", error)
            throw error
        }
    }


    // OPDATER FAQ
    const updateFaq = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/faq", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af faq")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // SLET FAQ
    const deleteFaq = async (params) => {

        try {
            await fetch (`http://localhost:3042/faq/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            /* Filter all the faqs without the matching ID. */
            const filteredArray = faqs.filter((act) => act._id !== params)
            setFaqs(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT FAQ BASERET PÅ ID
    const fetchFaqById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
          const response = await fetch(`http://localhost:3042/faq/${id}`)
    
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch faq: ${errorText}`)
          }
    
          const faq = await response.json()
          return faq.data
        } catch (error) {
          setError(error.message)
          console.error("Error fetching faq:", error)
        } finally {
          setIsLoading(false)
        }
      }
    
      useEffect(() => {
        fetchFaqs()
      }, [])
    

      return {
        faqs,
        createFaq,
        deleteFaq,
        setFaqs,
        fetchFaqs,
        fetchFaqById,
        updateFaq,
        isLoading,
        refetch,
        error,
      }
}

export { useFetchFaqs }