import { useLocation, useRoutes } from "react-router-dom"
import { useAuthContext } from "./context/useAuthContext"
import { BackofficeBlogs } from "./pages/Backoffice/BackofficeItems"
/* CUSTOM PAGES */
import Navigation from "./components/Navigation/Navigation"
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"
import SingleViewBlog from "./pages/SingleviewBlog/SingleviewBlog"
import FaqPage from "./pages/FaqPage"
import ContactPage from "./pages/ContactPage"
import LetsChat from "./components/LetsChat/LetsChat"
import Footer from "./components/Footer/Footer"
/* BACKOFFICE */
import ProtectedRoute from "./components/ProtectedRoute"
import Backoffice from "./pages/Backoffice/Backoffice"
import BlogForm from "./pages/Backoffice/Forms/BlogForm"
import Login from "./components/BackofficePage/Login/Login"

function App() {
  const { signedIn } = useAuthContext() // Henter 'signedIn' værdien fra useAuthContext hook, som indikerer om brugeren er logget ind

  const location = useLocation() // Bruges til at få den nuværende URL-bane (pathname) for at kontrollere, hvilken side brugeren er på
  
  // Tjekker om den nuværende URL-bane er en af de specifikede, som er startside, blog, FAQ eller kontakt
  // Hvis brugeren er på en af disse sider, bliver 'isNav, isFooter, isLetsChat' sat til 'true'
  const isNav = ["/", "/blog", "/faq", "/kontakt"].includes(location.pathname) 
  const isFooter = ["/", "/blog", "/faq", "/kontakt"].includes(location.pathname) 
  const isLetsChat = ["/", "/blog", "/faq"].includes(location.pathname) 
  

  // Definerer ruterne i appen
  const routes = useRoutes([
    { 
      path: "/", 
      element: <HomePage />
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    { 
      path: "/blog/:id",
      element: <SingleViewBlog />
    },
    { 
      path: "/faq", 
      element: <FaqPage />
    },
    { 
      path: "/kontakt", 
      element: <ContactPage />
    },
    { 
      path: "/login", 
      element: <Login />
    },
    { 
      path: "/backoffice", 
      element: (
        <ProtectedRoute isAllowed={signedIn}>
            <Backoffice />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "backofficeblogs", 
          element: <BackofficeBlogs />, 
          children: [
            {
              path: "add",
              element: <BlogForm />,
            },
            {
              path: "edit/:id",
              element: <BlogForm isEditMode={true} />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element : <div>NOT FOUND</div>
    },
  ])

  return (
    <>
      {isNav && <Navigation />}
      <div>{routes}</div>
      {isLetsChat && <LetsChat />}
      {isFooter && <Footer />}
    </>
  )
}

export default App