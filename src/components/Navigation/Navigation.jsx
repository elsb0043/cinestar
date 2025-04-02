import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import styles from './nav.module.css'
import NavButton from './NavButton/NavButton'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false) // Styre, om menuen er åben eller lukket

    const toggleNav = () => setIsOpen((prev) => !prev) // Skifter tilstanden for menuens åbning
    const closeNav = () => setIsOpen(false) // Lukker menuen

    // Navigation menu links og deres stier
    const Nav = [
        { 
          path: "/", 
          title: "Forside" 
        },
        { 
          path: "/blog", 
          title: "Blog" 
        },
        { 
          path: "/faq", 
          title: "Faq" 
        },
        { 
          path: "/kontakt", 
          title: "Kontakt" 
        },
        { 
          path: "/backoffice", 
          title: "Backoffice" 
        },
    ]

    return (
        <nav className={styles.navBar}>
            {/* Logo, som navigerer til startsiden */}
            <Link to="/">
                <img className={styles.navLogo} src="/assets/logo.png" alt="Logo" />
            </Link>

            <div className={styles.navList}>
              {/* Hamburger menu, der åbner og lukker navigationen */}
              <div className={styles.hamburger} onClick={toggleNav}>
                <NavButton isActive={isOpen} onToggle={toggleNav} />
              </div>
              
              {/* Links til navigationen, vises kun når menuen er åben */}
              <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                {Nav.map((item, index) => (
                    <NavLink key={index} to={item.path} onClick={closeNav} className={({ isActive }) => (isActive ? styles.active : '')}>
                        {item.title} {/* Titel på menuitem */}
                    </NavLink>
                ))}
              </div>
            </div>
        </nav>
    )
}

export default Navigation