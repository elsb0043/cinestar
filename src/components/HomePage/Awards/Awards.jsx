import styles from './awards.module.css'

function Awards() {

    return (
        <div className={styles.awards}>
            <div className={styles.awardsContent}>
                <img src="/assets/awards/award1.png" />
                <img src="/assets/awards/award2.png" />
                <img src="/assets/awards/award3.png" />
            </div>
        </div>
    )
}

export default Awards