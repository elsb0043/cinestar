import styles from './chat.module.css'

function LetsChat() {

    return (
        <div className={styles.chatContainer}>
             <div className={styles.chatContent}>
                <h2>Har du en idé i tankerne?</h2>
                <h2>Lad os starte dit projekt sammen</h2>
                <div className={styles.chatContentInfo}>
                    <h3>Cinestar Studio</h3>
                    <h3>+123-456-789</h3>
                    <h3>hello@awesomesite.com</h3>
                </div>
                <div className={styles.chatContentSoMe}>
                    <div className={styles.soMe}>
                        <h3>Facebook</h3>
                        <h3>Twitter</h3>
                    </div>
                    <div className={styles.soMe}>
                        <h3>LinkedIn</h3>
                        <h3>Instagram</h3>
                    </div>
                    <h3>Youtube</h3>
                </div>
            </div>
        </div>
    )
}

export default LetsChat