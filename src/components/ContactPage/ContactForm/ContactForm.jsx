import { useState } from "react"
import Button from "../../Button/Button"
import styles from "./form.module.css"
import SuccessMsg from "../../SuccessMsg/SuccessMsg"

function ContactForm() {
    const [formData, setFormData] = useState({ name: "", subject: "", description: "" }) // Definerer tilstand for formularens inputdata (navn, emne, og beskrivelse)
    
    // Definerer tilstand for serverens svar og andre svarmeddelelser
    const [response, setResponse] = useState([])
    const [response1, setResponse1] = useState("") // Besked til at takke brugeren
    const [response2, setResponse2] = useState("") // Yderligere information til brugeren
    const [errors, setErrors] = useState({}) // Håndtering af valideringsfejl
    const [sent, setSent] = useState(false) // Håndtering af om beskeden er sendt

    const closeMsg = () => setSent(false) // Funktion til at lukke succesbeskeden efter brugeren har set den

    // Funktion til at validere formularens data, inden det sendes
    const validate = () => {
        let newErrors = {}
        // Tjekker om de obligatoriske felter er udfyldt korrekt
        if (!formData.name.trim()) newErrors.name = "Navn er påkrævet"
        if (!formData.subject.trim()) newErrors.subject = "Ugyldigt emne"
        if (!formData.description.trim()) newErrors.description = "Beskrivelse er påkrævet"
        return newErrors  // Returnerer en liste af eventuelle fejl
    }

    // Håndterer formularens indsendelse
    const handleSubmit = async (e) => {
        e.preventDefault()  // Forhindrer standardformularens handling (sideopdatering)

        // Validerer formularen
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors) // Sætter fejl, hvis validering fejler
            return
        }

        setErrors({}) // Tømmer fejl, hvis validering er succesfuld

        try {
            // Sender formularens data til API'et via en POST-anmodning
            const response = await fetch("http://localhost:3042/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            // Hvis der er fejl i API-anmodningen, kastes en fejl
            if (!response.ok) {
                throw new Error("Der opstod en fejl med serveren.")
            }

            // Hvis anmodningen lykkedes, vis succesbesked til brugeren
            setResponse1(`Tak for din besked ${formData.name}!`)
            setResponse2(`Vi bestræber os på at kontakte dig via din email indenfor 24 timer.`)
            setSent(true)  // Sætter 'sent' til true for at vise succesbeskeden

            // Gemmer formularens data i localStorage, så det kan bruges senere
            const contactData = { ...formData, date: new Date().toISOString() }
            const contactHistory = JSON.parse(localStorage.getItem("contactHistory")) || []
            localStorage.setItem("contactHistory", JSON.stringify([...contactHistory, contactData]))

            // Nulstiller formularen efter succesfuld indsendelse
            setFormData({ name: "", subject: "", description: "" })
        } catch (error) {
            // Hvis der opstår en fejl under indsendelsen, vis en fejlbesked
            setResponse("Der opstod en fejl. Prøv venligst igen.")
        }
    }

    return (
        <div className={styles.formContent}>
            {/* Hvis beskeden er sendt, vis en succesbesked */}
            {sent ? (
                <SuccessMsg 
                    message1={response1}  // Den første succesmeddelelse
                    message2={response2}  // Den anden succesmeddelelse
                    onClose={closeMsg}    // Funktion til at lukke succesbeskeden
                />
            ) : (
                // Ellers, vis formularen
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    {/* Inputfelt for brugerens navn */}
                    <input
                        className={styles.name}
                        name="name"
                        placeholder="Navn"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {/* Vist fejlmeddelelse for navn, hvis validering fejler */}
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    {/* Inputfelt for emne */}
                    <input
                        className={styles.subject}
                        name="subject"
                        placeholder="Emne"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {/* Vist fejlmeddelelse for emne, hvis validering fejler */}
                    {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

                    {/* Textarea for beskrivelse */}
                    <textarea
                        className={styles.textarea}
                        name="description"
                        placeholder="Besked"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {/* Vist fejlmeddelelse for beskrivelse, hvis validering fejler */}
                    {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

                    {/* Send knap */}
                    <Button text="Send besked" type="submit" />
                </form>
            )}
        </div>
    )
}

export default ContactForm