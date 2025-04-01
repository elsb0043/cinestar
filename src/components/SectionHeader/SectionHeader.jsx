import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import styles from "./section.module.css"

function SectionHeader({ title }) {
    return (
        <div className={styles.section}>
            <h1>{title}</h1>
            <Breadcrumbs title={title} />
        </div>
    )
}

export default SectionHeader