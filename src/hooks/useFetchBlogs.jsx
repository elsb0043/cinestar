import { useCallback, useEffect, useState } from "react" // useCallback, useEffect og useState hooks fra React
import { useAuthContext } from "../context/useAuthContext" // Importerer konteksten for autentificering (f.eks. token)

// Custom hook til at håndtere fetching og oprettelse, opdatering og sletning af blogs
const useFetchBlogs = () => {
    // State for at gemme blog-data, fejlmeddelelser og loading status
    const [blogs, setBlogs] = useState([]) // Blogs state
    const [error, setError] = useState(null) // Fejl state
    const [isLoading, setIsLoading] = useState(false) // Loading state
    const { token } = useAuthContext() // Henter autentificeringstoken fra konteksten

    // HENT ALLE BLOGS – memoiseret med useCallback, så referencen forbliver stabil (dvs. at den ikke bliver genoprettet ved hver render)
    // fetchBlogs henter blogs fra API'et og opdaterer state
    const fetchBlogs = useCallback(async () => {
        setError(null)  // Rydder fejlstate
        setIsLoading(true)  // Sætter loading status til true
        try {
            // Fetch-anmodning for at hente blogs
            const response = await fetch("http://localhost:3042/blogs")
            const data = await response.json()  // Parser JSON-svaret
            setBlogs(data.data)  // Opdaterer blogs state med de hentede data
        } catch (error) {
            setError(error.message)  // Sætter fejlmeddelelse, hvis der opstår en fejl under fetching
            console.error("Error fetching blogs:", error)  // Logger fejlen
        } finally {
            setIsLoading(false)  // Sætter loading til false, uanset hvad
        }
    }, [])  // useCallback sikrer, at fetchBlogs ikke ændres på hver render

    // Refetch-funktion, der blot kalder fetchBlogs igen for at hente blogs
    const refetch = useCallback(() => {
        fetchBlogs()
    }, [fetchBlogs])  // useCallback sikrer, at refetch bruger den memoiserede version af fetchBlogs

    // OPRET BLOG – opretter en ny blog via API'et
    const createBlog = async (formData) => {
        try {
            // Fetch-anmodning for at oprette en blog med formData som body
            const response = await fetch ("http://localhost:3042/blog", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,  // Inkluderer autorisationstoken i headers
                },
                body: formData,  // Sender data som body i anmodningen
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af blog")  // Kaster en fejl, hvis anmodningen ikke var succesfuld
            }
            const result = await response.json()  // Parser JSON-svaret
            return result  // Returnerer resultatet af oprettelsen
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)  // Logger fejl, hvis der opstår en
            throw error  // Kaster fejlen videre
        }
    }

    // OPDATER BLOG – opdaterer en eksisterende blog
    const updateBlog = async (formData) => {
        try {
            // Fetch-anmodning for at opdatere en blog med formData som body
            const response = await fetch ("http://localhost:3042/blog", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,  // Inkluderer autorisationstoken i headers
                },
                body: formData,  // Sender opdaterede data som body
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af blog")  // Kaster en fejl, hvis anmodningen ikke var succesfuld
            }
            const result = await response.json()  // Parser JSON-svaret
            return result  // Returnerer resultatet af opdateringen
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)  // Logger fejl, hvis der opstår en
            throw error  // Kaster fejlen videre
        }
    }

    // SLET BLOG – sletter en blog baseret på ID
    const deleteBlog = async (params) => {
        try {
            // Fetch-anmodning for at slette en blog med specifikt ID
            await fetch (`http://localhost:3042/blog/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,  // Inkluderer autorisationstoken i headers
                },
            })

            /* Filter alle blogs uden den blog, der skal slettes. */
            const filteredArray = blogs.filter((act) => act._id !== params)  // Filtrerer bloggene for at fjerne den slettede blog
            setBlogs(filteredArray)  // Opdaterer state med den filtrerede liste
        } catch (error) {
            console.error("Fejl ved sletning:", error)  // Logger fejl, hvis der opstår en under sletning
        }
    }

    // HENT BLOG BASERET PÅ ID – henter en blog med et specifikt ID
    const fetchBlogById = async (id) => {
        setError(null)  // Rydder fejlstate
        setIsLoading(true)  // Sætter loading status til true
    
        try {
            // Fetch-anmodning for at hente blog baseret på ID
            const response = await fetch(`http://localhost:3042/blog/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()  // Henter fejlinformation, hvis anmodningen fejler
                throw new Error(`Failed to fetch blog: ${errorText}`)  // Kaster en fejl med fejlinformationen
            }
    
            const blog = await response.json()  // Parser JSON-svaret
            return blog.data  // Returnerer blogdataen
        } catch (error) {
            setError(error.message)  // Sætter fejlmeddelelse, hvis der opstår en fejl
            console.error("Error fetching blog:", error)  // Logger fejlen
        } finally {
            setIsLoading(false)  // Sætter loading til false, uanset hvad
        }
    }

    // useEffect hook for at hente blogs ved første render
    useEffect(() => {
        fetchBlogs()  // Henter blogs ved første render
    }, [])  // useEffect vil kun køre én gang på komponentens første render

    // Returnerer de nødvendige værdier og funktioner fra hooken
    return {
        blogs,         // Alle blogs
        createBlog,    // Funktion til at oprette en blog
        deleteBlog,    // Funktion til at slette en blog
        setBlogs,      // Funktion til at opdatere blog-liste
        fetchBlogs,    // Funktion til at hente alle blogs
        fetchBlogById, // Funktion til at hente blog baseret på ID
        updateBlog,    // Funktion til at opdatere en blog
        isLoading,     // Loading state
        refetch,       // Funktion til at hente blogs igen
        error,         // Fejlmeddelelse, hvis en fejl opstår
    }
}

export { useFetchBlogs }