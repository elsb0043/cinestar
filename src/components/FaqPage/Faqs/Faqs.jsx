import { useEffect, useState } from "react"
import styles from "./faqs.module.css"
import { useFetchFaqs } from "../../../hooks/useFetchFaqs"  // Importerer custom hook til at hente FAQ-data

// Faq-komponenten, som viser et enkelt FAQ-element
const Faq = ({ faq, index, toggleFAQ }) => {
    return (
        <div
            className={`${styles.faq} ${faq.open ? styles.open : ""}`}  // Toggler 'open' klasse baseret på 'faq.open' tilstand
            key={index}  // Brug index som nøgle for at sikre korrekt opdatering
            onClick={() => toggleFAQ(index)}  // Klik på FAQ'en toggler åben/lukket tilstand for denne FAQ
        >
            <div className={styles.faqQuestion}>{faq.question}</div> {/* Vist spørgsmål */}
            <div className={styles.faqAnswer}>{faq.answer}</div> {/* Vist svar */}
        </div>
    )
}

function Faqs() {
    const { faqs, fetchFaqs, isLoading, error } = useFetchFaqs() // Bruger useFetchFaqs hook'en til at hente FAQ-data samt håndtere loading og fejltilstande
    const [localFaqs, setLocalFaqs] = useState([]) // State til at holde FAQ'er i lokal tilstand, inklusive åben/lukket tilstand for hver FAQ

    // useEffect der kører når 'faqs' ændres og sætter de sidste 3 FAQ'er i lokal tilstand
    useEffect(() => {
        if (faqs) {
            // Skærer de sidste 3 FAQ'er ud og tilføjer en 'open' tilstand, der initialt er 'false'
            const lastThree = faqs.slice(-3)
            setLocalFaqs(lastThree.map(faq => ({...faq, open: false})))  // Opdaterer lokal tilstand med de sidste 3 FAQ'er
        }
    }, [faqs])  // Effekt kører, når 'faqs' ændres

    // useEffect der kører ved komponentens første rendering og henter FAQ'er
    useEffect(() => {
        fetchFaqs()  // Henter FAQ-data fra serveren ved at kalde fetchFaqs
    }, [fetchFaqs])  // Effekt kører kun, når 'fetchFaqs' ændres

    // Funktion der toggler åben/lukket tilstand for en given FAQ ved klik
    const toggleFAQ = index => {
        // Opdaterer lokal FAQ-liste, hvor den specifikke FAQ får ændret sin 'open' tilstand
        setLocalFaqs(
          localFaqs.map((faq, i) => {
            // Hvis indekset matcher, toggles FAQ'ens 'open' tilstand
            if (i === index) {
              return {...faq, open: !faq.open}
            } else {
              // Hvis indekset ikke matcher, forbliver 'open' tilstanden uændret (sætter den til false)
              return {...faq, open: false}
            }
          })
        )
    }

    // Håndterer indlæsningstilstand og fejltilstand
    if (isLoading) {
        return <div>Loading FAQs...</div>;  // Vist under indlæsning af FAQ'er
    }
    if (error) {
        return <div>Error loading FAQs: {error}</div>;  // Vist hvis der er fejl under hentning af FAQ'er
    }

    return (
        <div>
            {/* Container for alle FAQ'erne */}
            <div className={styles.faqsContainer}>
                {/* Mapper gennem de lokaliserede FAQ'er og viser dem med 'Faq' komponenten */}
                {localFaqs.map((faq, index) => (
                    <Faq faq={faq} index={index} key={faq._id} toggleFAQ={toggleFAQ} />
                ))}
            </div>
        </div>
    )
}

export default Faqs