import Button from '../Button/Button'
import styles from './msg.module.css'

// SuccessMsg-komponenten, der viser en succesbesked med to beskeder og en lukknap
function SuccessMsg({ message1, message2, onClose }) {
    return (
        <div className={styles.successMsgContainer}>
            <div className={styles.successMsgContent}>
                <h2>{message1}</h2> {/* Vis første besked */}
                <p>{message2}</p> {/* Vis anden besked */}
                <Button text="Luk" type="submit" onClick={onClose} /> {/* Knap der lukker beskeden */}
            </div>
        </div>
    )
}

export default SuccessMsg