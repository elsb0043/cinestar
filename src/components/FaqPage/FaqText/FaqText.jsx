import styles from "./text.module.css"

function FaqText() {
    return (
        <div className={styles.faqTextContainer}>
            <div className={styles.faqText}>
                <h3>Ofte stillede spørgsmål</h3>
                <h2>De mest almindelige spørgsmål, vi får</h2>
                <h4>Her finder du svar på de spørgsmål, vi oftest bliver stillet om vores processer, tjenester og produktioner. Har du brug for yderligere information? Tøv ikke med at kontakte os!</h4>
            </div>
        </div>
    )
}

export default FaqText