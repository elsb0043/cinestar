import { useEffect, useState } from "react" 
import { useNavigate, useOutletContext, useParams } from "react-router-dom" // useNavigate for navigation, useParams for at få URL-parametre, useOutletContext for at få data fra et parent outlet
import { useFetchBlogs } from "../../../hooks/useFetchBlogs" // Importerer hook til at arbejde med blogs
import styles from "./form.module.css" 
import Button2 from "../../../components/Button/Button2"

// BlogForm komponent til at håndtere både oprettelse og opdatering af blogs
const BlogForm = ({ isEditMode }) => {
    const [title, setTitle] = useState("") // State til blog-titlen
    const [teaser, setTeaser] = useState("") // State til teaser/beskrivelse
    const [description, setDescription] = useState("") // State til blog-beskrivelse
    const [image, setImage] = useState(null) // State til at gemme billede URL
    const [selectedFile, setSelectedFile] = useState(null) // State til at gemme valgt fil (billede)
    
    const { refetch } = useOutletContext() // Henter refetch-funktion fra outlet context for at opdatere data
    const navigate = useNavigate() // Henter navigate-funktionen for at kunne navigere efter formularen er indsendt
    const { id } = useParams() // Henter blog ID fra URL-parameter (kun relevant i redigeringstilstand)
    const { createBlog, fetchBlogById, updateBlog } = useFetchBlogs() // Hook til at håndtere blog-oprettelse, opdatering og henting af blog data

    // useEffect for at hente blog-data, hvis isEditMode er true og id er til stede
    useEffect(() => {
        // Hvis vi er i redigerings-tilstand og har et ID
        if (isEditMode && id) {
            const loadBlogData = async () => {
                try {
                    // Henter bloggen baseret på ID
                    const response = await fetchBlogById(id)
        
                    if (response) {
                        // Hvis bloggen findes, forudfyld formularen med data
                        setTitle(response.title)
                        setTeaser(response.teaser)
                        setDescription(response.description)
                        setImage(response.image) // Sætter det eksisterende billede (hvis nogen)
                    }
                } catch (error) {
                    console.error("Error fetching blog:", error) // Logger fejl, hvis der er problemer med at hente bloggen
                }
            }

            loadBlogData() // Kald funktionen for at hente blog-data
        }
    }, []) // Tom array sikrer, at useEffect kun kører én gang ved første render

    // Håndterer ændring af billede
    const handleImageChange = (event) => {
        const file = event.target.files[0] // Henter den valgte fil (billede)
        if (file) {
            setSelectedFile(file) // Gemmer den valgte fil i state
            const objUrl = window.URL.createObjectURL(file) // Opretter en objekt-URL for billedet
            setImage(objUrl) // Sætter objekt-URL som billede i state
        }
    }

    // Håndterer indsendelse af blog-formular
    const handleSubmitBlog = async (event) => {
        event.preventDefault() // Forhindrer standardformularens opførsel (sideopfriskning)

        const blogData = new FormData() // Opretter en FormData-objekt for at kunne sende data som multipart/form-data (inklusive filer)
        blogData.append("title", title) // Tilføjer titel til blogdata
        blogData.append("teaser", teaser) // Tilføjer teaser til blogdata
        blogData.append("description", description) // Tilføjer beskrivelse til blogdata

        // Hvis der er valgt et billede, tilføjes det til blogdata
        if (selectedFile) {
            blogData.append("file", selectedFile)
        }

        try {
            let response
            if (isEditMode && id) {
                // Hvis vi er i redigeringstilstand, tilføj blog ID og opdater blog
                blogData.append("id", id)
                response = await updateBlog(blogData)
            } else {
                // Hvis vi er i oprettelses-tilstand, opretter vi en ny blog
                response = await createBlog(blogData)
            }

            if (response) {
                await refetch() // Opdaterer blog-listen ved at kalde refetch
                navigate("/backoffice/backofficeblogs") // Naviger tilbage til backoffice blogs side
            }
        } catch (error) {
            console.error("Fejl ved håndtering af blog:", error) // Logger fejl, hvis der opstår en fejl ved oprettelse eller opdatering
        }
    }

    // Render formularen til oprettelse eller opdatering af blog
    return (
        <form onSubmit={handleSubmitBlog} className={styles.form}>
            {/* Header ændres baseret på om vi er i redigerings- eller oprettelsestilstand */}
            <h2>{isEditMode ? "Opdater blog" : "Tilføj blog"}</h2>
            <div className={styles.file}>
                <label htmlFor="image">Vælg billede (valgfrit):</label>
                {/* Hvis et billede er valgt, vises en forhåndsvisning */}
                {image && <img className={styles.previewImage} src={image} />} 
                <input className={styles.backInput} id="image" type="file" onChange={handleImageChange} /> 
            </div>
            <div>
                <label htmlFor='title'>Titel:</label>
                <input
                    className={styles.backInput}
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Opdaterer state med titel
                    required // Gør feltet obligatorisk
                />
            </div>
            <div>
                <label htmlFor='teaser'>Teaser:</label>
                <input
                    className={styles.backInput}
                    id='teaser'
                    type='text'
                    value={teaser}
                    onChange={(e) => setTeaser(e.target.value)} // Opdaterer state med teaser
                    required
                />
            </div>
            <div>
                <label htmlFor='description'>Beskrivelse:</label>
                <input
                    className={`${styles.backInput} ${styles.lastInput}`}
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Opdaterer state med beskrivelse
                    required
                />
            </div>

            {/* Knap til at indsende formularen */}
            <Button2
                type='submit'
                buttonText={isEditMode ? "Opdater blog" : "Tilføj blog"}  // Teksten på knappen ændres baseret på tilstand
                background={!isEditMode && "green"}  // Hvis vi er i oprettelsestilstand, sættes knapbaggrund til grøn
            />
        </form>
    )
}

export default BlogForm