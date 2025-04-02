import { MotionConfig, motion } from "framer-motion"
import styles from "./navButton.module.css"

function NavButton({ isActive, onToggle }) {

    // X
    const openVariants = {
        top: {
            rotate: 45,
            top: "48%",
            width: "4rem",
        },
        middle: {
            opacity: 0,
        },
        bottom: {
            rotate: -45,
            bottom: "45%",
            width: "4rem",
        },
    }

    // Inaktiv burgerbutton
    const closedVariants = {
        top: {
            rotate: 0,
            top: "37%",
        },
        middle: {
            opacity: 1,
            left: "calc(50% + 1rem)",
        },
        bottom: {
            rotate: 0,
            bottom: "30%",
        },
    }

    return (
        <MotionConfig className={styles.buttonContainer}>
        <motion.button
            initial={false}
            animate={isActive ? styles.open : styles.closed}
            onClick={onToggle}
            className={styles.button}
        >
            <motion.span
            className={styles.bar}
            style={{ top: "35%" }}
            animate={isActive ? openVariants.top : closedVariants.top}
            />
            <motion.span
            className={styles.bar}
            style={{ top: "50%", left: "calc(50% + 1rem)" }}
            animate={isActive ? openVariants.middle : closedVariants.middle}
            />
            <motion.span
            className={styles.bar}
            style={{ bottom: "30%" }}
            animate={isActive ? openVariants.bottom : closedVariants.bottom}
            />
        </motion.button>
        </MotionConfig>
    )
}

export default NavButton