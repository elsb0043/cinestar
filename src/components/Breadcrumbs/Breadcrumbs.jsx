import { Link, useLocation } from "react-router-dom"
import useBreadcrumbs from "use-react-router-breadcrumbs"
import styles from "./breadcrumbs.module.css"

const routes = [
    {
        path: "/",
        breadcrumb: "Forside",
    },
    {
        path: "/blog",
        breadcrumb: "Blog Arkiv",
    },
    {
        path: "/blog/:id",
        breadcrumb: "Blog",
    },
    {
        path: "/faq",
        breadcrumb: "FAQ",
    },
    {
        path: "/kontakt",
        breadcrumb: "Kontakt",
    },
]

function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbs(routes)
    const location = useLocation()

    if (location.pathname === "/") return null

    return (
        <nav aria-label="breadcrumb">
            <ol className={styles.breadcrumbsContainer}>
                {breadcrumbs.map(({ match, breadcrumb }, index) => (
                    <li
                        key={match.pathname}
                        className={`${styles.breadcrumbItem} ${
                            index === breadcrumbs.length - 1 ? styles.active : ""
                        }`}
                    >
                        {index === breadcrumbs.length - 1 ? (
                            <div className={styles.lastCrumb}>
                                {typeof breadcrumb === 'string' ? breadcrumb.toUpperCase() : breadcrumb}
                            </div>
                        ) : (
                            <Link
                                to={match.pathname}
                                className={
                                    location.pathname.startsWith('/blog/') && match.pathname === '/blog'
                                        ? styles.blogArchiveCrumb
                                        : ''
                                }
                            >
                                {breadcrumb}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumbs