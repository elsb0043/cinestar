import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE BLOGS – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
    const fetchBlogs = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/blogs")
            const data = await response.json()
            setBlogs(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching blogs:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Refetch-funktion, der blot kalder fetchBlogs
    const refetch = useCallback(() => {
        fetchBlogs()
    }, [fetchBlogs])


    // OPRET BLOG
    const createBlog = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/blog", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af blog")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // OPDATER BLOG
    const updateBlog = async (formData) => {
        try {
            const response = await fetch ("http://localhost:3042/blog", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af blog")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error
        }
    }


    // SLET BLOG
    const deleteBlog = async (params) => {

        try {
            await fetch (`http://localhost:3042/blog/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            /* Filter all the blogs without the matching ID. */
            const filteredArray = blogs.filter((act) => act._id !== params)
            setBlogs(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT BLOG BASERET PÅ ID
    const fetchBlogById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
          const response = await fetch(`http://localhost:3042/blog/${id}`)
    
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch blog: ${errorText}`)
          }
    
          const blog = await response.json()
          return blog.data
        } catch (error) {
          setError(error.message)
          console.error("Error fetching blog:", error)
        } finally {
          setIsLoading(false)
        }
      }
    
      useEffect(() => {
        fetchBlogs()
      }, [])
    

      return {
        blogs,
        createBlog,
        deleteBlog,
        setBlogs,
        fetchBlogs,
        fetchBlogById,
        updateBlog,
        isLoading,
        refetch,
        error,
      }
}

export { useFetchBlogs }