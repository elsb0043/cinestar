import { icons } from '../../../services/Icons'
import styles from './services.module.css'

function Services() {

    return (
        <div className={styles.servicesContainer}>
            <div className={styles.servicesContent}>
                <div className={styles.servicesTitle}>
                    <h3>Service</h3>
                    <h2>Hvilken service tilbyder vi?</h2>
                </div>
                <div className={styles.servicesProvider}>
                    <div className={styles.servicesProviderList}>
                        <div className={styles.servicesProviderInfo}>
                            <div className={styles.icons}>{icons['Film']}</div>
                            <div className={styles.text}>
                                <h3>Film produktion</h3>
                                <p>Vi skaber professionelle filmproduktioner, der formidler dit budskab klart, engagerende og visuelt overbevisende.</p>
                            </div>
                        </div>
                        <div className={styles.servicesProviderInfo}>
                            <div className={styles.icons}>{icons['FilmPhoto']}</div>
                            <div className={styles.text}>
                                <h3>En kreativ retning</h3>
                                <p>Vi sikrer en kreativ retning, der løfter dit projekt fra almindeligt til uforglemmeligt.</p>
                            </div>
                        </div>
                        <div className={styles.servicesProviderInfo}>
                            <div className={styles.icons}>{icons['Tv']}</div>
                            <div className={styles.text}>
                                <h3>Tv produktion</h3>
                                <p>Vi leverer komplette løsninger inden for formatudvikling, optagelse og redigering.</p>
                            </div>
                        </div>
                        <div className={styles.servicesProviderInfo}>
                            <div className={styles.icons}>{icons['Music']}</div>
                            <div className={styles.text}>
                                <h3>Musik video</h3>
                                <p>Lad din musik træde frem i et visuelt univers, der forstærker din lyd og dit budskab.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services