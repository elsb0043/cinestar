import styles from './header.module.css'

function PageHeader({ title }) {

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h3>Cinestar Studio</h3>
                <h1>Film & Tv</h1>
                <h1 className={styles.produktion}>Produktion</h1>
                <p>Vi skaber levende fortællinger, der fanger dit publikum. Fra idé til færdigt produkt leverer vi professionelle film- og tv-løsninger, der gør din historie uforglemmelig.</p>
            </div>
        </div>
    )
}

export default PageHeader