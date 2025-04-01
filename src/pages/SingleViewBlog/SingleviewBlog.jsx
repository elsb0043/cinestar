import { useEffect, useState } from "react" // Importerer hooks fra React
import { useParams } from "react-router-dom" // Bruges til at få parametre fra URL'en
import { useFetchBlogs } from "../../hooks/useFetchBlogs"
import styles from './single.module.css' // Importerer CSS-modul til styling
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer"

// SingleViewBlog-komponenten viser detaljerne for en bestemt blog og giver brugeren mulighed for at tilføje den til kurven.
function SingleViewBlog() {
  const [blog, setBlog] = useState({})
  const [localLoading, setLocalLoading] = useState(true)

  // Henter id fra URL-parametre (bruges til at hente bloggen)
  const { id } = useParams()

  // Henter fetch-funktionen og error-håndtering fra custom hook
  const { fetchBlogById, error } = useFetchBlogs()

  // useEffect hook til at hente bloggen baseret på id
  useEffect(() => {
    const getBlog = async () => { // Async funktion, der henter bloggen via fetchBlogById(id)
      if (!id) return // Hvis (!id) er truthy, så sæt setLocalLoading(true) -> falsy (null, undefined..), så stopper funktionen 
      setLocalLoading(true) 
      try {
        const fetchedBlog = await fetchBlogById(id) // Henter bloggen fra API ved hjælp af id
        if (fetchedBlog) {
          setBlog(fetchedBlog) // Opdaterer state med den hentede blog
        }
      } catch (error) { // Fanger og logger fejl, hvis hentningen fejler
        console.error("Error fetching blog:", error)
      } finally { // Sætter loading-tilstand til false efter hentning (uanset om den lykkes eller fejler)
        setLocalLoading(false)
      }
    }

    getBlog()
  }, [id]) // Re-fetch bloggen, når id ændres

  // Hvis bloggen ikke er hentet eller der opstår en fejl, vis en meddelelse
  if (localLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!blog) return <p>Blog not found</p>

  return (
    <>
      <Navigation />
      <SectionHeader title="BLOG" />
      <div className={styles.singleViewContainer}>
        <div className={styles.blogCard}>
          <img src={blog.image} />
          <h3>{blog.title}</h3>
          <p className={styles.created}>Oprettet {blog.created.slice(0, 10)}</p>
          <p>{blog.description}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleViewBlog