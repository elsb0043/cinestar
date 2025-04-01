import { icons } from "../../../services/Icons"
import styles from "./text.module.css"

function ContactText() {

    return (
        <div className={styles.text}>
            <div className={styles.textInfo}>
                <h3>Kontakt</h3>
                <h2>Tøv ikke med at tage kontakt</h2>
                <h4>Har du spørgsmål eller brug for mere information om vores tjenester og processer? Vores team står klar til at hjælpe dig. Kontakt os, og lad os tage en uforpligtende samtale om dine behov og idéer.</h4>
            </div>
            <div className={styles.textContact}>
                <div className={styles.textContactContent}>
                    <div className={styles.icons}>{icons['Phone']} </div>
                    <p className={styles.info}>+45 12 34 56 78</p>
                </div>
                <div className={styles.textContactContent}>
                    <div className={styles.icons}>{icons['Pin']} </div>
                    <p className={styles.info}>Fotovej 66, 8456 Cineby</p>
                </div>
                <div className={styles.textContactContent}>
                    <div className={styles.icons}>{icons['Mail']} </div>
                    <p className={styles.info}>cinestar@production.dk</p>
                </div>
            </div>
        </div>
    )
}

export default ContactText