import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useFetchBlogs } from "../../../hooks/useFetchBlogs"
import styles from "./form.module.css"
import Button2 from "../../../components/Button/Button2"

const BlogForm = ({ isEditMode }) => {
    const [name, setName] = useState("")
    const [teaser, setTeaser] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const { refetch } = useOutletContext()
    const navigate = useNavigate()
    const { id } = useParams()
    const { createBlog, fetchBlogById, updateBlog } = useFetchBlogs()

    // Hent bloggen hvis editMode er true
    useEffect(() => {
        if (isEditMode && id) {
            const loadBlogData = async () => {
                try {
                  const response = await fetchBlogById(id)
        
                  if (response) {
                    // Forudfyld formularen med bloggen data
                    setName(response.name)
                    setTeaser(response.teaser)
                    setDescription(response.description)
                    setImage(response.image)
                  }
                } catch (error) {
                  console.error("Error fetching blog:", error)
                }
            }

            loadBlogData()
        }
    }, [])


    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file) // Sæt den valgte fil i state
            const objUrl = window.URL.createObjectURL(file) // Opret en objekt-URL for billedet
            setImage(objUrl) // Sæt URL'en som billede
        }
    }


    const handleSubmitBlog = async (event) => {
        event.preventDefault()

        const blogData = new FormData()
        blogData.append("name", name)
        blogData.append("teaser", teaser)
        blogData.append("description", description)
        blogData.append("rating", rating)

        if (selectedFile) {
            blogData.append("file", selectedFile)
        }

        try {
            let response
            if (isEditMode && id) {
                blogData.append("id", id)
                response = await updateBlog(blogData)
            } else {
                response = await createBlog(blogData)
            }
            console.log (
                isEditMode ? "Blog er opdateret" : "Blog er oprettet", 
                response
            )

            if (response) {
                await refetch()
                navigate("/backoffice/blogs")
            }
        } catch (error) {
            console.error("Fejl ved håndtering af blog:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitBlog} className={styles.form}>
            <h2>{isEditMode ? "Opdater blog" : "Tilføj blog"}</h2>
            <div>
                {/* 
                Når htmlFor-attributten på en <label> matcher id-attributten på et <input>-element, oprettes der en forbindelse mellem dem.
                Dette betyder, at når brugeren klikker på etiketten, bliver det tilknyttede inputfelt automatisk aktiveret eller fokuseret. 
                Dette gør både brugervenligheden og tilgængeligheden (accessibility) bedre
                */}
                <label htmlFor='name'>Navn:</label>
                <input
                    className={styles.backInput}
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='teaser'>Teaser:</label>
                <input
                    className={styles.backInput}
                    id='teaser'
                    type='text'
                    value={teaser}
                    onChange={(e) => setTeaser(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='description'>Blog:</label>
                <input
                    className={styles.backInput}
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div className={styles.file}>
                    <label htmlFor="image">Vælg billede (valgfrit):</label>
                    {image && <img className={styles.previewImage} src={image} />} 
                    <input className={styles.backInput} id="image" type="file" onChange={handleImageChange} /> 
                </div>
            </div>

            <Button2
                type='submit'
                buttonText={isEditMode ? "Opdater blog" : "Tilføj blog"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default BlogForm