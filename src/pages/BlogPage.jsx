import BlogArchive from "../components/BlogPage/BlogArchive/BlogArchive"
import Newsletter from "../components/BlogPage/Newsletter/Newsletter"
import SectionHeader from "../components/SectionHeader/SectionHeader"

function BlogPage() {

    return (
        <>
            <SectionHeader title='BLOG ARKIV' />
            <BlogArchive />
            <Newsletter />
        </>
    )
}

export default BlogPage