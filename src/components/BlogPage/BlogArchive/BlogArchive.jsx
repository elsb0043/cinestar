import { useFetchBlogs } from '../../../hooks/useFetchBlogs' // Importerer useFetchBlogs hook'en, som håndterer hentning af blogindlæg fra en ekstern API
import BlogCard from '../BlogCard/BlogCard' // Importerer BlogCard komponenten, som bruges til at vise hvert enkelt blogindlæg

// Definerer BlogArchive komponenten, som er ansvarlig for at vise en liste af blogindlæg
function BlogArchive() {
    const { blogs } = useFetchBlogs() // Bruger useFetchBlogs hook'en til at hente blogdata og få adgang til blogindlæggene

    return (
        <div>
            {/* Mapper gennem alle blogindlæg og renderer et BlogCard for hver */}
            {blogs.map((blog) => (
                // Keyen sættes til blog._id for at sikre, at hvert element har en unik nøgle
                // BlogCard komponenten får props med blogobjektet, så det kan vise relevante data
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogArchive