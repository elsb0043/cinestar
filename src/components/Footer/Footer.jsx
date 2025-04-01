import styles from './footer.module.css'

function Footer() {

    return (
        <footer>
            <div className={styles.footerContent}>
                <img className={styles.footerLogo} src="/assets/logo.png" alt="Logo" />
                <div className={styles.footerInfo}>
                    <p>
                        COPYRIGHT 202 © CINESTAR | POWERED BY ROMETHEME STUDIO
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer