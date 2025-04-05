import styles from './button.module.css'

// Definerer Button komponenten, som tager 'text', 'type', 'onClick', og 'onClickExtra' som props
function Button({ text, type = "button", onClick, onClickExtra }) {

    // Definerer en funktion til at håndtere klik-hændelsen
    const handleClick = (e) => {
        // Hvis der er en onClick prop, kald den med eventet som argument
        if (onClick) onClick(e)

        // Hvis der er en onClickExtra prop, kald den også med eventet som argument
        if (onClickExtra) onClickExtra(e)
    }

    return (
        // Returnerer et button element, som bruger den specifikke CSS-klasse og håndterer klik-hændelsen
        <button className={styles.button} type={type} onClick={handleClick}>
            {/* Vis teksten inde i knappen, som er givet som prop */}
            {text}
        </button>
    )
}

export default Button