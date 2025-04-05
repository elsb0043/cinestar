import { useState } from 'react'
import { useBreakpoint } from '../../../hooks/useBreakpoints' // Importerer useBreakPoint custom hook - bruges til at tilpasse videoens skærmstørrelse
import styles from './studio.module.css'
import cinestar from '/assets/video/cinestar.mp4' // Importerer videofilen
import coverImage from '/assets/video/cinestar-overlay.jpg' // Importerer billede, der bruges som forhåndsvisning af videoen
import ReactPlayer from 'react-player' // Importerer ReactPlayer, som bruges til at afspille videoen

function CinestarStudio() {
    const [isPlaying, setIsPlaying] = useState(false) // State, der holder styr på om videoen afspilles eller ej 

    const isDesktop = useBreakpoint()

    const togglePlay = () => setIsPlaying(prev => !prev) // Funktion til at toggle mellem at spille og stoppe videoen

    return (
        <div className={styles.studioContainer}>
           <div className={styles.studioText}>
                <h3>Cinestar Studio</h3>
                <h2>Har du en idé til dit næste projekt?</h2>
                <h4>Lad os omsætte dine visioner til levende billeder, der fænger dit publikum. Hos os får du en professionel, kreativ proces fra idéudvikling til færdig produktion.</h4>
            </div> 
            <div className={styles.studioFilm}>
                <div className={styles.videoWrapper}>
                    {/* ReactPlayer bruges til at vise og afspille videoen */}
                    <ReactPlayer 
                        className='player'
                        url={cinestar} // URL'en til videofilen
                        controls={true}
                        // Her tilpasses højden og bredden af ReactPlayer afhængigt af skærmstørrelsen
                        height={isDesktop ? 400 : '100%'} // Hvis det er desktop (skærm ≥ 1024px), brug 500px højde – ellers 100% højde
                        width={isDesktop ? 900 : '100%'}  // Hvis det er desktop, brug 650px bredde – ellers 100% bredde (tilpasser sig mobilskærm)
                        light={coverImage} // Bruger et billede som forhåndsvisning af videoen
                        playing={isPlaying} // Kontrollerer om videoen afspilles
                        playIcon={ 
                            // Tilpasset play-knap, der aktiverer afspilning
                            <button className={styles.customPlayButton} onClick={togglePlay} >
                                <div>▶</div>
                            </button>
                        }
                    />
                </div>
                <p className={styles.tøvIkke}>Tøv ikke med at vælge Cinestar til dit næste film-projekt</p>
                <h3>Hos Cinestar kombinerer vi vores passion for historiefortælling med et skarpt øje for detaljen. Med moderne udstyr og et erfarent team sikrer vi, at din produktion løfter sig fra skitse til strålende slutresultat – hver gang.</h3>
                <div className={styles.studioFilmInfo}>
                    <div className={styles.studioFilmInfoText}>
                        <p className={styles.plus}>250+</p>
                        <p className={styles.production}>Film produktion</p>
                    </div>
                    <div className={styles.studioFilmInfoText}>
                        <p className={styles.plus}>78+</p>
                        <p className={styles.production}>Musik video</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CinestarStudio