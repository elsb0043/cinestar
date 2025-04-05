import { Outlet, useNavigate } from "react-router-dom"
import { useAlert } from "../../context/alertContext" // useAlert bruges til at vise advarsels- og bekræftelsesbeskeder
import { useFetchBlogs } from "../../hooks/useFetchBlogs" // useFetchBlogs hook bruges til at hente og håndtere blogs
import Button2 from "../../components/Button/Button2"

// BackofficeBlogs komponent, der viser en liste af blogs i backoffice og giver mulighed for at tilføje, redigere og slette blogs
const BackofficeBlogs = () => {
  const { blogs, deleteBlog, refetch } = useFetchBlogs() // Henter blogs, deleteBlog og refetch funktioner fra useFetchBlogs hook
  const { showError, showConfirmation } = useAlert() // Henter showError og showConfirmation funktioner fra useAlert hook til at vise fejladvarsler og bekræftelsesdialoger
  const navigate = useNavigate() // Henter navigate funktionen til at kunne navigere mellem forskellige ruter

  // Funktion der navigerer til siden for at tilføje en ny blog
  const handleAddBlog = () => {
    navigate("/backoffice/backofficeblogs/add") // Naviger til "Tilføj blog" ruten
  }

  // Funktion der navigerer til siden for at redigere en eksisterende blog
  const handleEdit = (blogId) => {
    navigate(`/backoffice/backofficeblogs/edit/${blogId}`) // Naviger til redigeringsruten for den specifikke blog
  }

  // Funktion der håndterer sletning af en blog. Først viser en bekræftelsesdialog, og hvis brugeren bekræfter, slettes bloggen.
  const handleConfirmation = (blogId) => {
    showConfirmation(
      "Du er ved at slette denne blog", // Tekst, der informerer om sletning
      "Er du sikker?", // Spørgsmål, som bekræftes af brugeren
      () => deleteBlog(blogId), // Hvis brugeren bekræfter, kaldes deleteBlog for at slette bloggen
      () => showError("Sletning annulleret.") // Hvis brugeren annullerer, vises en fejlbesked om annulleringen
    )
  }

  return (
    <article>
      {/* Tabel der viser en liste af blogs med deres titel, billede, teaser og beskrivelse */}
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Billede</th>
            <th>Teaser</th>
            <th>Beskrivelse</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapper over alle blogs og viser deres data i tabelrækker */}
          {blogs?.map((blog) => (
            <tr key={blog._id} className="backofficeItem">
              <td>{blog.title}</td> 
              <td>
                <img src={blog.image} alt={blog.title} /> 
              </td>
              <td>{blog.teaser}</td> 
              <td>{blog.description}</td> 
              <td className="buttons">
                {/* Button til at slette bloggen */}
                <Button2
                  buttonText="Slet" 
                  background="red"
                  onClick={() => handleConfirmation(blog._id)} // Når knappen klikkes, kaldes handleConfirmation for at vise sletningsdialogen
                />
                {/* Button til at redigere bloggen */}
                <Button2
                  buttonText="Rediger" 
                  onClick={() => handleEdit(blog._id)} // Når knappen klikkes, navigeres brugeren til redigeringssiden for bloggen
                />
              </td>
            </tr>
          ))}
          {/* En ekstra række med en knap til at tilføje en ny blog */}
          <tr>
            <td>
              {/* Button til at navigere til siden for at tilføje en ny blog */}
              <Button2
                buttonText="Tilføj blog" // Tekst på knappen
                background="green" // Baggrundsfarve på knappen
                onClick={handleAddBlog} // Når knappen klikkes, navigeres brugeren til "Tilføj blog"-siden
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Outlet komponent bruges til at give adgang til refetch-funktionen til underkomponenter */}
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeBlogs }