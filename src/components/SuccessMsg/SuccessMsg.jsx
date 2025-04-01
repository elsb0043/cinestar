import Button from '../Button/Button'
import styles from './msg.module.css'

function SuccessMsg({ message1, message2, onClose }) {
    return (
        <div className={styles.successMsgContainer}>
            <div className={styles.successMsgContent}>
                <h2>{message1}</h2>
                <p>{message2}</p>
                <Button text="Luk" type="submit" onClick={onClose} />
            </div>
        </div>
    )
}

export default SuccessMsg