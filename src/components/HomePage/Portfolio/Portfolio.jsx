import styles from './portfolio.module.css'
import PortfolioSwiper from './PortfolioSwiper/PortfolioSwiper'

function Portfolio() {

    return (
        <div className={styles.portfolio}>
            <div className={styles.portfolioTitle}>
                <h3>Portfolio</h3>
                <h2>Udvalgte projekter</h2>
            </div>
            <PortfolioSwiper /> {/* Importerer Portfolio slideren */}
            <div className={styles.portfolioText}>
                <p>Her præsenterer vi et udvalg af de produktioner, vi er stolte af at have skabt.</p>
                <p>Hvert projekt fortæller sin unikke historie og illustrerer vores ambition om at levere høj kvalitet, originalitet og visuel gennemslagskraft.</p>
                <p className={styles.lastP}>Gå på opdagelse, og lad dig inspirere af vores arbejde.</p>
            </div>
        </div>
    )
}

export default Portfolio