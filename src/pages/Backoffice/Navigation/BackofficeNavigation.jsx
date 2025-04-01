import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {

  return (
    <ul className={styles.backofficeNavigation}>
      {/* Navigation tilbage til forsiden */}
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
      
      {/* Navigation for Udtalelser */}
      <li>
        <NavLink
          to='/backoffice/reviews' // Link til udtalelsersiden i backoffice
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Udtalelser
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation