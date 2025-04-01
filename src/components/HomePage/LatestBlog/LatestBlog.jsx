import { useFetchBlogs } from '../../../hooks/useFetchBlogs'
import styles from './latest.module.css'

function LatestBlog() {
    const { blogs, isLoading, error } = useFetchBlogs()

    const latestBlog = blogs.length > 0 ? blogs[0] : null

    return (
        <div className={styles.latestContainer}>
             <div className={styles.latestTitle}>
                <h3>Blog</h3>
                <h2>Vores seneste blog</h2>
                <h4>Hold dig opdateret med de seneste nyheder, indblik og historier fra Cinestar. Vi deler inspiration, tips og bag kulisserne fra vores spændende projekter og produktioner.</h4>
            </div>

            {isLoading && <p>Indlæser seneste blog...</p>}
            {error && <p className={styles.error}>Fejl: {error}</p>}

            {latestBlog && (
                <div className={styles.blogPost}>
                    <img src={latestBlog.image} />
                    <div className={styles.blogPostText}>
                        <h3>{latestBlog.title}</h3>
                        <p>{latestBlog.teaser}</p>
                        <p className={styles.created}>Oprettet {latestBlog.created.slice(0, 10)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LatestBlog