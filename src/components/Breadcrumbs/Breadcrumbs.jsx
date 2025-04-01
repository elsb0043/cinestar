import styles from "./breadcrumbs.module.css"

function Breadcrumbs({ title }) {

    return (
        <div className={styles.crumbs}>
            <h3>Forside</h3>
            <span> / </span>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default Breadcrumbs