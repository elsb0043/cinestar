import { useState } from "react"
import Button from "../../Button/Button"
import styles from "./meet.module.css"
import SuccessMsg from "../../SuccessMsg/SuccessMsg"

function MeetForm() {
    const [formData, setFormData] = useState({ name: "", subject: "", description: "" })
    const [response, setResponse] = useState(null)
    const [response1, setResponse1] = useState("")
    const [response2, setResponse2] = useState("")
    const [errors, setErrors] = useState({})
    const [sent, setSent] = useState(false)

    const closeMsg = () => setSent(false)

    const validate = () => {
        let newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Navn er påkrævet"
        if (!formData.subject.trim()) newErrors.subject = "Ugyldigt emne"
        if (!formData.description.trim()) newErrors.description = "Beskrivelse er påkrævet"
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})

        try {
            // Send formulardata til API'et
            const response = await fetch("http://localhost:3042/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Der opstod en fejl med serveren.")
            }

            // Hvis anmodningen lykkes, vis succesbesked
            setResponse1(`Tak for din besked ${formData.name}!`)
            setResponse2(`Vi bestræber os på at kontakte dig via din email indenfor 24 timer.`)
            setSent(true)

            // Gem formulardata i localStorage
            const contactData = { ...formData, date: new Date().toISOString() }
            const contactHistory = JSON.parse(localStorage.getItem("contactHistory")) || []
            localStorage.setItem("contactHistory", JSON.stringify([...contactHistory, contactData]))

            // Reset formularen
            setFormData({ name: "", subject: "", description: "" })
        } catch (error) {
            // Hvis der opstår en fejl under indsendelsen
            setResponse("Der opstod en fejl. Prøv venligst igen.")
        }
    }

    return (
        <div className={styles.formContent}>
            {sent ? (
                 <SuccessMsg 
                    message1={response1} 
                    message2={response2} 
                    onClose={closeMsg} 
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.name}
                        name="name"
                        placeholder="Navn"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    <input
                        className={styles.subject}
                        name="subject"
                        placeholder="Emne"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

                    <textarea
                        className={styles.textarea}
                        name="description"
                        placeholder="Besked"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

                    <Button text="Send besked" type="submit" />
                </form>
            )}
        </div>
    )
}

export default MeetForm