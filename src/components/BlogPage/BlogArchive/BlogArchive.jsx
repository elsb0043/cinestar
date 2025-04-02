import { useFetchBlogs } from '../../../hooks/useFetchBlogs'
import BlogCard from '../BlogCard/BlogCard'

function BlogArchive() {
    const { blogs } = useFetchBlogs()

    return (
        <div>
             {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogArchive