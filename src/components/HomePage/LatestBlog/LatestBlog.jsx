import { useFetchBlogs } from '../../../hooks/useFetchBlogs' // Importerer brug af brugerdefineret hook 'useFetchBlogs' til at hente blogdata
import styles from './latest.module.css'

function LatestBlog() {
    const { blogs, isLoading, error } = useFetchBlogs() // Destrukturering af data fra useFetchBlogs-hooket: blogs, isLoading og error

    const latestBlog = blogs.length > 0 ? blogs[0] : null // Finder den nyeste blog ved at tage den første blog i arrayet, hvis der findes blogs

    return (
        <div className={styles.latestContainer}>
            <div className={styles.latestTitle}>
                <h3>Blog</h3>
                <h2>Vores seneste blog</h2>
                <h4>
                    Hold dig opdateret med de seneste nyheder, indblik og historier fra Cinestar. 
                    Vi deler inspiration, tips og bag kulisserne fra vores spændende projekter og produktioner.
                </h4>
            </div>

            {/* Vis en indlæsningsmeddelelse, hvis blogdataene stadig hentes */}
            {isLoading && <p>Indlæser seneste blog...</p>}

            {/* Vis en fejlmeddelelse, hvis der er et problem med at hente blogdata */}
            {error && <p className={styles.error}>Fejl: {error}</p>}

            {/* Hvis der er en ny blog (dvs. latestBlog ikke er null), vis dens information */}
            {latestBlog && (
                <div className={styles.blogPost}>
                    <img src={latestBlog.image} alt="Blog post image" />
                    
                    <div className={styles.blogPostText}>
                        <h3>{latestBlog.title}</h3>
                        <p>{latestBlog.teaser}</p>
                        
                        {/* Viser oprettelsesdatoen for bloggen, formatteret til 'YYYY-MM-DD' */}
                        <p className={styles.created}>Oprettet {latestBlog.created.slice(0, 10)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LatestBlog