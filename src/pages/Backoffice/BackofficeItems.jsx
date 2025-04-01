import { Outlet, useNavigate } from "react-router-dom"
import { useAlert } from "../../context/alertContext"
import { useFetchBlogs } from "../../hooks/useFetchBlogs"
import { useFetchReviews } from "../../hooks/useFetchReviews"
import Button2 from "../../components/Button/Button2"

// BLOGS
const BackofficeBlogs = () => {
  // Henter blogs og nødvendige funktioner fra useFetchBlogs hook
  const { blogs, deleteBlog, refetch } = useFetchBlogs()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  // Funktion til at navigere til siden for at tilføje en blog
  const handleAddBlog = () => {
    navigate("/backoffice/backofficeblogs/add")
  }

  // Funktion til at navigere til siden for at redigere en blog
  const handleEdit = (blogId) => {
    navigate(`/backoffice/backofficeblogs/edit/${blogId}`)
  }

  // Funktion til at vise en bekræftelsesdialog ved sletning af en blog
  const handleConfirmation = (blogId) => {
    showConfirmation(
      "Du er ved at slette denne blog", // Bekræftelsestekst
      "Er du sikker?", // Spørgsmål
      () => deleteBlog(blogId), // Hvis bekræftet, slet bloggen
      () => showError("Sletning annulleret.") // Hvis annulleret, vis fejlbesked
    )
  }

  return (
    <article>
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
          {blogs?.map((blog) => (
            <tr key={blog._id} className="backofficeItem">
              <td>{blog.title}</td>
              <td>
                <img src={blog.image} alt={blog.title} />
              </td>
              <td>{blog.teaser}</td>
              <td>{blog.description}</td>
              <td className="buttons">
                {/* Sletningsknap */}
                <Button2
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(blog._id)}
                />
                {/* Redigeringsknap */}
                <Button2
                  buttonText="Rediger"
                  onClick={() => handleEdit(blog._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              {/* Tilføj blog-knap */}
              <Button2
                buttonText="Tilføj blog"
                background="green"
                onClick={handleAddBlog}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Outlet for at lade underkomponenter få adgang til refetch */}
      <Outlet context={{ refetch }} />
    </article>
  )
}

// REVIEWS
const BackofficeReviews = () => {
  // Henter udtalelser og nødvendige funktioner fra useFetchReviews hook
  const { reviews, deleteReview, refetch } = useFetchReviews()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  // Funktion til at navigere til siden for at tilføje en udtalelse
  const handleAddReview = () => {
    navigate("/backoffice/reviews/add")
  }

  // Funktion til at navigere til siden for at redigere en udtalelse
  const handleEdit = (reviewId) => {
    navigate(`/backoffice/reviews/edit/${reviewId}`)
  }

  // Funktion til at vise en bekræftelsesdialog ved sletning af en udtalelse
  const handleConfirmation = (reviewId) => {
    showConfirmation(
      "Du er ved at slette denne udtalelse", // Bekræftelsestekst
      "Er du sikker?", // Spørgsmål
      () => deleteReview(reviewId), // Hvis bekræftet, slet udtalelsen
      () => showError("Sletning annulleret.") // Hvis annulleret, vis fejlbesked
    )
  }

  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Job</th>
            <th>Udtalelse</th>
            <th>Rating</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review) => (
            <tr key={review._id} className='backofficeItem'>
              <td>{review.name}</td>
              <td>{review.position}</td>
              <td>{review.text}</td>
              <td>{review.rating}</td>
              <td className='buttons'>
                {/* Sletningsknap */}
                <Button2
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(review._id)}
                />
                {/* Redigeringsknap */}
                <Button2
                  buttonText='Rediger'
                  onClick={() => handleEdit(review._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              {/* Tilføj udtalelse-knap */}
              <Button2
                buttonText='Tilføj en udtalelse'
                background='green'
                onClick={() => handleAddReview()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Outlet for at lade underkomponenter få adgang til refetch */}
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeBlogs, BackofficeReviews }