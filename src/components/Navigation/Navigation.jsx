import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './nav.module.css'
import NavButton from './NavButton/NavButton'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false) // Styre, om menuen er åben eller lukket

    const toggleNav = () => setIsOpen((prev) => !prev) // Skifter tilstanden for menuens åbning

    // Funktion der lukker navigationen og scroller til toppen af siden
    const closeNav = () => {
        setIsOpen(false) // Lukker navigationen ved at sætte 'isOpen' til false
        setTimeout(() => { // Starter en timer for at vente 100 millisekunder før handlingen
            window.scrollTo(0, 0) // Scroller til toppen af siden (0, 0 betyder venstre top hjørne)
        }, 100) // Vent i 100 millisekunder før scroll handlingen udføres
    }

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
              {/* Burgermenu, der åbner og lukker navigationen */}
              <NavButton isActive={isOpen} onToggle={toggleNav} />
              
              {/* Links til navigationen, vises kun når menuen er åben */}
              <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                {Nav.map((item, index) => (
                    <NavLink 
                      key={index} 
                      to={item.path} 
                      onClick={closeNav} 
                      className={({ isActive }) => (isActive ? styles.active : '')}
                      >
                        {item.title} {/* Titel på menuitem */}
                    </NavLink>
                ))}
              </div>
            </div>
        </nav>
    )
}

export default Navigation