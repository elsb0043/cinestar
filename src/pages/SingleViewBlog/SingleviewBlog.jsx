import { useEffect, useState } from "react"
import { useParams } from "react-router-dom" // useParams bruges til at hente URL-parametre, specifikt blog-id
import { useFetchBlogs } from "../../hooks/useFetchBlogs" // Bruger den custom hook, der håndterer blog-relaterede API-anmodninger
import styles from './single.module.css'
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer"

// SingleViewBlog-komponenten viser detaljerne for en bestemt blog og giver brugeren mulighed for at tilføje den til kurven.
function SingleViewBlog() {
  const [blog, setBlog] = useState({}) // State til at opbevare bloggen, initialiseret som et tomt objekt
  const [localLoading, setLocalLoading] = useState(true) // State til at håndtere loading-tilstand, initialiseret til true

  const { id } = useParams() // Henter id fra URL-parametrene (via useParams) for at kunne hente den relevante blog

  const { fetchBlogById, error } = useFetchBlogs() // Henter fetchBlogById-funktionen og error fra useFetchBlogs hook for at hente blogdata og håndtere fejl

  // useEffect hook til at hente bloggen baseret på id
  useEffect(() => {
    const getBlog = async () => { // Async funktion, der henter bloggen via fetchBlogById(id)
      if (!id) return // Hvis (!id) er truthy, så sæt setLocalLoading(true) -> falsy (null, undefined..), så stopper funktionen 
      setLocalLoading(true) // Sætter loading til true, da vi starter med at hente data
      try {
        const fetchedBlog = await fetchBlogById(id) // Henter blogdata ved hjælp af id'et og fetchBlogById-funktionen
        if (fetchedBlog) { // Hvis bloggen er fundet og returneret, opdater blog state med data
          setBlog(fetchedBlog) // Opdaterer state med den hentede blog
        }
      } catch (error) { // Fanger og logger fejl, hvis hentningen fejler
        console.error("Error fetching blog:", error) // Logger fejl til konsollen for fejlfinding
      } finally { // Sætter loading-tilstand til false efter hentning (uanset om den lykkes eller fejler)
        setLocalLoading(false) // Sætter loading-tilstanden til false, da API-kaldet er afsluttet
      }
    }

    getBlog() // Kalder funktionen for at hente bloggen
  }, [id]) // useEffect-hooken afhænger af id, så den vil blive kørt igen, hvis id'et ændres (re-fetcher bloggen)

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
          {/* Vist oprettelsesdato for bloggen. 'blog.created' indeholder datoen i et stringformat (fx "2025-03-31T07:07:48.024Z"). */}
          {/* '.slice(0, 10)' bruges til at trimme datoen, så kun de første 10 tegn vises (f.eks. "2025-03-31"), som er datoen uden tid. */}
          <p className={styles.created}>Oprettet {blog.created.slice(0, 10)}</p>
          <p>{blog.description}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleViewBlog