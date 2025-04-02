import { useEffect, useState } from "react"
import styles from "./faqs.module.css"
import { useFetchFaqs } from "../../../hooks/useFetchFaqs"

const Faq = ({ faq, index, toggleFAQ }) => {
    return (
        <div
            className={`${styles.faq} ${faq.open ? styles.open : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <div className={styles.faqQuestion}>{faq.question}</div>
            <div className={styles.faqAnswer}>{faq.answer}</div>
        </div>
    )
}

function Faqs() {
    const { faqs, fetchFaqs, isLoading, error, setFaqs } = useFetchFaqs()
    const [localFaqs, setLocalFaqs] = useState([])

    useEffect(() => {
        if (faqs) {
            const lastThree = faqs.slice(-3)
            setLocalFaqs(lastThree.map(faq => ({...faq, open: false})))
        }
    }, [faqs])

    useEffect(() => {
        fetchFaqs()
    }, [fetchFaqs])

    const toggleFAQ = index => {
        setLocalFaqs(
          localFaqs.map(( faq, i ) => {
            if (i === index) {
              return {...faq, open: !faq.open}
            } else {
              return {...faq, open: false}
            }
          })
        )
    }

    if (isLoading) {
        return <div>Loading FAQs...</div>;
    }
    if (error) {
        return <div>Error loading FAQs: {error}</div>;
    }

    return (
        <div>
             <div className={styles.faqsContainer}>
                {localFaqs.map((faq, index) => (
                    <Faq faq={faq} index={index} key={faq._id} toggleFAQ={toggleFAQ} />
                ))}
            </div>
        </div>
    )
}

export default Faqs