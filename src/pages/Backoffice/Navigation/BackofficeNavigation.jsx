import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {

  return (
    <ul className={styles.backofficeNavigation}>
      {/* Navigation tilbage til forsiden, og log ud */}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Til Frontend
        </NavLink>
      </li>

      {/* Navigation for Blogs */}
      <li>
        <NavLink
          to='/backoffice/backofficeblogs' // Link til blogsiden i backoffice
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Blogs
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation