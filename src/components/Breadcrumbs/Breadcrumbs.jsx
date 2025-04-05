import { Link, useLocation } from "react-router-dom"
import useBreadcrumbs from "use-react-router-breadcrumbs"
import styles from "./breadcrumbs.module.css"

// Definerer brugerdefinerede ruter med labels (breadcrumbs) til specifikke stier
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
        path: "/blog/:id", // Dynamisk route (singleViewBlog)
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
    const breadcrumbs = useBreadcrumbs(routes) // Genererer breadcrumb-objekter baseret på den aktuelle route
    const location = useLocation() // Henter den aktuelle placering (URL) i app'en

    if (location.pathname === "/") return null // Hvis brugeren er på forsiden, vises der ikke breadcrumbs

    return (
        <nav aria-label="breadcrumb">
            {/* Wrapper til hele breadcrumb-listen – vigtig for tilgængelighed (skærmlæsere) */}
            <ol className={styles.breadcrumbsContainer}>
                {/* Gennemløber hvert breadcrumb-objekt der er genereret fra ruterne */}
                {breadcrumbs.map(({ match, breadcrumb }, index) => (
                    <li
                        key={match.pathname}
                        className={`${styles.breadcrumbItem} ${
                            // Hvis det er det sidste element i listen (den aktuelle side), tilføj en class der markerer det som aktivt
                            index === breadcrumbs.length - 1 ? styles.active : ""
                        }`}
                    >
                        {/* Hvis det er det sidste breadcrumb, vis det som en "passiv" tekst */}
                        {index === breadcrumbs.length - 1 ? (
                            <div className={styles.lastCrumb}>
                                {/* Hvis breadcrumb er en streng, gør det uppercase – ellers brug som det er */}
                                {typeof breadcrumb === 'string' ? breadcrumb.toUpperCase() : breadcrumb}
                            </div>
                        ) : (
                            // Hvis det IKKE er sidste breadcrumb, så vis som et klikbart <Link>
                            <Link
                                to={match.pathname}
                                className={
                                    // Hvis vi er inde på en specifik blogpost-side (/blog/:id), og dette breadcrumb er selve /blog, så giv det en særlig styling
                                    location.pathname.startsWith('/blog/') && match.pathname === '/blog'
                                        ? styles.blogArchiveCrumb
                                        : ''
                                }
                            >
                                {/* Teksten for breadcrumb (enten fra routes eller custom) */}
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