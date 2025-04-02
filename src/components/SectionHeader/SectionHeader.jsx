import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import styles from "./section.module.css"

function SectionHeader({ title }) {
    return (
        <div className={styles.section}>
             <div className={styles.sectionContent}>
                <h1>{title}</h1>
                <Breadcrumbs />
            </div>
        </div>
    )
}

export default SectionHeader