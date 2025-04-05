import { useState } from "react"
import Button from "../../Button/Button"
import styles from "./meet.module.css"
import SuccessMsg from "../../SuccessMsg/SuccessMsg" // Importerer komponent til succesmeddelelser

function MeetForm() {
    // Brug af useState til at håndtere formularens data og tilstande
    const [formData, setFormData] = useState({ name: "", subject: "", description: "" }) // Formularens data
    const [response, setResponse] = useState(null) // Fejlmeddelelser eller succesbesked
    const [response1, setResponse1] = useState("") // Første del af succesbesked
    const [response2, setResponse2] = useState("") // Anden del af succesbesked
    const [errors, setErrors] = useState({}) // Fejl i formularfelterne
    const [sent, setSent] = useState(false) // Angiver om beskeden er sendt succesfuldt

    const closeMsg = () => setSent(false) // Funktion til at lukke succesmeddelelsen

    // Funktion til at validere formularfelterne
    const validate = () => {
        let newErrors = {} // Objekt til at holde fejlmeddelelser
        if (!formData.name.trim()) newErrors.name = "Navn er påkrævet" // Tjekker om navn er tomt
        if (!formData.subject.trim()) newErrors.subject = "Ugyldigt emne" // Tjekker om emne er tomt
        if (!formData.description.trim()) newErrors.description = "Beskrivelse er påkrævet" // Tjekker om beskrivelse er tom
        return newErrors // Returnerer fejlene
    }

    // Funktion til at håndtere formularindsendelse
    const handleSubmit = async (e) => {
        e.preventDefault() // Forhindrer standard formularindsendelse

        const validationErrors = validate() // Validerer formularfelterne
        if (Object.keys(validationErrors).length > 0) { // Hvis der er valideringsfejl
            setErrors(validationErrors) // Sætter fejlene i tilstanden
            return // Stopper indsendelsen
        }

        setErrors({}) // Nulstiller fejlene, hvis der ikke er nogen

        try {
            // Sender formulardata til API'et
            const response = await fetch("http://localhost:3042/message", {
                method: "POST", // POST-metode
                headers: {
                    "Content-Type": "application/json", // Angiver at vi sender JSON
                },
                body: JSON.stringify(formData), // Sender formularens data som JSON
            })

            if (!response.ok) { // Hvis serveren returnerer en fejl
                throw new Error("Der opstod en fejl med serveren.") // Kaster en fejl
            }

            // Hvis anmodningen lykkes, vis succesbesked
            setResponse1(`Tak for din besked ${formData.name}!`) // Første del af succesbeskeden
            setResponse2(`Vi bestræber os på at kontakte dig via din email indenfor 24 timer.`) // Anden del af succesbeskeden
            setSent(true) // Sætter sent til true for at vise succesmeddelelse

            // Gem formulardata i localStorage for historik
            const meetingData = { ...formData, date: new Date().toISOString() } // Tilføjer dato til data
            const meetingHistory = JSON.parse(localStorage.getItem("meetingHistory")) || [] // Henter tidligere data fra localStorage

            // Opdaterer localStorage ved at tilføje de nye data til historikken
            // De gamle data bliver bevaret, og de nye data bliver tilføjet til slutningen af listen
            localStorage.setItem("meetingHistory", JSON.stringify([...meetingHistory, meetingData]))

            // Nulstiller formularen efter indsendelse
            setFormData({ name: "", subject: "", description: "" })
        } catch (error) {
            // Hvis der opstår en fejl under indsendelsen
            setResponse("Der opstod en fejl. Prøv venligst igen.") // Sætter fejlmeddelelsen
        }
    }

    return (
        <div className={styles.formContent}>
            {/* Hvis beskeden er sendt succesfuldt, vis succesmeddelelse */}
            {sent ? (
                <SuccessMsg 
                    message1={response1} 
                    message2={response2} 
                    onClose={closeMsg} 
                />
            ) : (
                // Ellers, vis formularen
                <form onSubmit={handleSubmit}>
                    {/* Inputfelt for navn */}
                    <input
                        className={styles.name}
                        name="name"
                        placeholder="Navn"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Opdaterer navn i formData
                    />
                    {/* Hvis der er fejl på navn, vis fejlmeddelelse */}
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    {/* Inputfelt for emne */}
                    <input
                        className={styles.subject}
                        name="subject"
                        placeholder="Emne"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })} // Opdaterer emne i formData
                    />
                    {/* Hvis der er fejl på emne, vis fejlmeddelelse */}
                    {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

                    {/* Tekstområde for beskrivelse */}
                    <textarea
                        className={styles.textarea}
                        name="description"
                        placeholder="Besked"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} // Opdaterer beskrivelse i formData
                    />
                    {/* Hvis der er fejl på beskrivelse, vis fejlmeddelelse */}
                    {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

                    {/* Send-knap */}
                    <Button text="Send besked" type="submit" />
                </form>
            )}
        </div>
    )
}

export default MeetForm