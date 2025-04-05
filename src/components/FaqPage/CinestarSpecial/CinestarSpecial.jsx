import { useEffect, useState } from "react" 
import styles from "./special.module.css" 
import { useFetchFaqs } from "../../../hooks/useFetchFaqs" // Importerer custom hook til at hente FAQ-data

// Faq-komponenten, der håndterer visning af et enkelt FAQ-element
const Faq = ({ faq, isOpen, toggleFAQ }) => {
    // Returnerer null, hvis der ikke er nogen faq (hvis faq er undefined eller null)
    if (!faq) {
        return null
    }
    return (
        // Div der viser spørgsmålet og svaret. Tilføjer 'open' klasse, hvis FAQ'en er åben
        <div
            className={`${styles.faq} ${isOpen ? styles.open : ""}`} // Toggler mellem åben/ikke-åben tilstand
            key={faq._id}
            onClick={toggleFAQ} // Klik på FAQ'en toggler om den er åben eller lukket
        >
            <div className={styles.faqQuestion}>{faq.question}</div> {/* Vist spørgsmål */}
            <div className={styles.faqAnswer}>{faq.answer}</div> {/* Vist svar */}
        </div>
    )
}

function CinestarSpecial() {
    // Bruger useFetchFaqs hook'en til at hente FAQ-data, samt håndtere loading og fejl
    const { faqs, fetchFaqs, isLoading, error } = useFetchFaqs()
    
    // State til at holde styr på om FAQ'en er åben eller lukket
    const [isOpen, setIsOpen] = useState(false)

    // Henter den første FAQ, hvis der er nogen
    const firstFaq = faqs && faqs.length > 0 ? faqs[0] : null

    // useEffect hook'en henter FAQ'er, når komponenten bliver mountet eller når fetchFaqs ændres
    useEffect(() => {
        fetchFaqs() // Kalder fetchFaqs for at hente data
    }, [fetchFaqs]) // Effekten kører kun, når fetchFaqs funktionen ændres

    // Funktion til at toggle mellem åben/ikke-åben tilstand
    const toggleFAQ = () => {
        setIsOpen(!isOpen)
    }

    // Vist under indlæsning af FAQ'er
    if (isLoading) {
        return <div>Loading FAQs...</div>
    }

    // Vist hvis der opstår en fejl under hentning af FAQ'er
    if (error) {
        return <div>Error loading FAQs: {error}</div>
    }

    return (
        <div>
            <div className={styles.firstFaqContainer}>
                {/* Vist den første FAQ og gør den interaktiv med toggle */}
                <Faq faq={firstFaq} isOpen={isOpen} toggleFAQ={toggleFAQ} />
                <div className={styles.firstFaqText}>
                    <h4>
                        Cinestar skiller sig ud ved at kombinere kreativt håndværk med teknisk ekspertise. 
                        Vi tror på at fortælle historier, der berører, inspirerer og efterlader et varigt indtryk. 
                        Vores dedikerede team arbejder passioneret for at skabe unikke produktioner med høj kvalitet 
                        og et personligt præg, der gør hver film og hvert projekt helt specielt.
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default CinestarSpecial