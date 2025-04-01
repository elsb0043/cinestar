import styles from './history.module.css'

function History() {

    return (
        <div className={styles.historyContainer}>
            <div className={styles.historyText}>
                <h3>Historien</h3>
                <h2>Historien bag Cinestar</h2>
                <h4>Cinestar blev grundlagt med en passion for at fortælle historier, der fanger og bevæger sit publikum. Virksomheden begyndte som en lille uafhængig film- og tv-produktionsenhed med et klart fokus på originalt og visuelt engagerende indhold.</h4>
            </div>
            <div className={styles.historyCeo}>
                <h3>Dyas Kardinal</h3>
                <h2>Ceo af Cinestar</h2>
                <img src="/assets/filming.jpg" />
            </div>
        </div>
    )
}

export default History