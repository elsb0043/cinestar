import styles from './studio.module.css'
import cinestar from '/assets/video/cinestar.mp4'
import coverImage from '/assets/video/cinestar-overlay.jpg'
import ReactPlayer from 'react-player'
import { useState } from 'react'

function CinestarStudio() {
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => setIsPlaying(prev => !prev);

    return (
        <div className={styles.studioContainer}>
           <div className={styles.studioText}>
                <h3>Cinestar Studio</h3>
                <h2>Har du en idé til dit næste projekt?</h2>
                <h4>Lad os omsætte dine visioner til levende billeder, der fænger dit publikum. Hos os får du en professionel, kreativ proces fra idéudvikling til færdig produktion.</h4>
            </div> 
            <div className={styles.studioFilm}>
                <div className={styles.videoWrapper}>
                    <ReactPlayer 
                        url={cinestar} 
                        height={200}
                        width={350}
                        light={coverImage}
                        playing={isPlaying}
                        onClick={togglePlay}
                        playIcon={ 
                            <button className={styles.customPlayButton} onClick={togglePlay}>
                                <div>
                                    ▶
                                </div>
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