import { useState, useEffect } from 'react'

// Custom hook: Bruges til at finde ud af, om skærmstørrelsen er over eller under et givent breakpoint (som standard 1024px)
const useBreakpoint = (breakpoint = 1024) => {
  // Initialiserer state 'isDesktop' til true eller false baseret på aktuel vinduesbredde
  // Dette sker kun en gang ved initialisering (via funktion i useState)
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint)

  useEffect(() => {
    // Funktion der opdaterer state, når vinduet ændrer størrelse
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint)
    }

    window.addEventListener('resize', handleResize) // Tilføjer en event listener til vinduets resize-event, så vi kan reagere på ændringer i skærmstørrelse

    // Returnerer en cleanup-funktion, der fjerner event listener igen når komponenten afmonteres
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint]) // Effekt kører igen, hvis breakpoint-værdien ændres

  // Returnerer true hvis skærmen er større eller lig med breakpoint – ellers false
  return isDesktop
}

export { useBreakpoint }