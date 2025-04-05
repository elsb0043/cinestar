import { Link } from 'react-router-dom'
import Button from '../../Button/Button'
import styles from './card.module.css'

// Definerer BlogCard komponenten, som modtager et 'blog' objekt som props og viser blogindlæggets information
function BlogCard({ blog }) {

    return (
        // Wrapper div med en unik 'key' for at hjælpe React med at identificere elementer ved rendering
        <div key={blog._id} className={styles.blogPosts}>
            <div className={styles.blogCard}>
                <img src={blog.image} alt={blog.title} />
                <div className={styles.blogCardText}>
                    <h3>{blog.title}</h3>
                    <p>{blog.teaser}</p>
                    {/* Link, som navigerer brugeren til den fulde blogpost-side, når der klikkes */}
                    <Link to={`/blog/${blog._id}`}>
                        <Button text="Læs Mere" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard