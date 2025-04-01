import { Link } from 'react-router-dom'
import Button from '../../Button/Button'
import styles from './card.module.css'

function BlogCard({ blog }) {

    return (
        <div key={blog._id} className={styles.blogPosts}>
            <div className={styles.blogCard}>
                <img src={blog.image} />
                <h3>{blog.title}</h3>
                <p>{blog.teaser}</p>
                <Link to={`/blog/${blog._id}`}>
                    <Button text="Læs Mere" />
                </Link>
            </div>
        </div>
    )
}

export default BlogCard