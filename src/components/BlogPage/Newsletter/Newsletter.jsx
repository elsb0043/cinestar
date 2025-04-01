import { useState } from 'react'
import styles from './news.module.css'
import Button from '../../Button/Button'

function Newsletter() {
    const [email, setEmail] = useState('') // State til at gemme den indtastede e-mail
    const [isSubmitted, setIsSubmitted] = useState(false) // State til at spore, om formularen er indsendt

    // Funktion til at håndtere formularindsendelse
    const handleSubmit = async (e) => {
        e.preventDefault() // Undgå sideopdatering

        // API-kald for at tilføje subscriber (forudsat at din API er tilgængelig på /subscription endpoint)
        try {
            const response = await fetch('http://localhost:3042/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            // Tjek, om svaret var vellykket
            if (!response.ok) {
                throw new Error('Failed to subscribe')
            }

            // Hvis det lykkes, skal du opdatere tilstanden og vise succesmeddelelsen
            setIsSubmitted(true)
        } catch (error) {
            // Hvis der var en fejl, skal du logge den på konsollen og vise en fejlmeddelelse
            console.error('Error subscribing:', error)
            setIsSubmitted(false) // Bliv på subscription, hvis det mislykkedes
        }
    }

    return (
        <div className={styles.newsletterContainer}>
            {/* Hvis brugeren ikke er tilmeldt endnu */}
            {!isSubmitted ? (
                <div className={styles.newsletterContent}>
                    <div className={styles.newsletterContentText}>
                        <h3>En blog, der kan inspirere og hjælpe dig</h3>
                        <p>Få de nyeste opdateringer, tips og indsigter direkte i din indbakke. Vores blog deler viden, inspiration og historier, der kan hjælpe dig med at tage dine projekter til det næste niveau.</p>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.newsForm}>
                        <input
                            required
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Opdater e-mail-tilstanden ved inputændring
                        />
                        <button type='submit'>Tilmeld nu</button>
                    </form>
                </div>
            ) : (
                // Hvis brugeren allerede er tilmeldt
                <div className={styles.successMessage}>
                    <h3>Tak for din tilmelding!</h3>
                    <p>Du har nu tilmeldt dig vores nyhedsbrev.</p>
                </div>
            )}
        </div>
    )
}

export default Newsletter