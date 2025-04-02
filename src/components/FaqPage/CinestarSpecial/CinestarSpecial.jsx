import { useEffect, useState } from "react"
import styles from "./special.module.css"
import { useFetchFaqs } from "../../../hooks/useFetchFaqs"

const Faq = ({ faq, isOpen, toggleFAQ }) => {
    if (!faq) {
        return null
    }
    return (
        <div
            className={`${styles.faq} ${isOpen ? styles.open : ""}`}
            key={faq._id}
            onClick={toggleFAQ}
        >
            <div className={styles.faqQuestion}>{faq.question}</div>
            <div className={styles.faqAnswer}>{faq.answer}</div>
        </div>
    )
}

function CinestarSpecial() {
    const { faqs, fetchFaqs, isLoading, error } = useFetchFaqs()
    const [ isOpen, setIsOpen ] = useState(false)
    const firstFaq = faqs && faqs.length > 0 ? faqs[0] : null

    useEffect(() => {
        fetchFaqs()
    }, [fetchFaqs])

    const toggleFAQ = () => {
        setIsOpen(!isOpen)
    }

    if (isLoading) {
        return <div>Loading FAQs...</div>
    }
    if (error) {
        return <div>Error loading FAQs: {error}</div>
    }

    return (
        <div>
             <div className={styles.firstFaqContainer}>
                <Faq faq={firstFaq} isOpen={isOpen} toggleFAQ={toggleFAQ} />
                <div className={styles.firstFaqText}>
                    <h4>Cinestar skiller sig ud ved at kombinere kreativt håndværk med teknisk ekspertise. Vi tror på at fortælle historier, der berører, inspirerer og efterlader et varigt indtryk. Vores dedikerede team arbejder passioneret for at skabe unikke produktioner med høj kvalitet og et personligt præg, der gør hver film og hvert projekt helt specielt.</h4>
                </div>
            </div>
        </div>
    )
}

export default CinestarSpecial