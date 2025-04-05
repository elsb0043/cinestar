import { Outlet } from 'react-router-dom'
import BackofficeNavigation from './Navigation/BackofficeNavigation'
import Logout from '../../components/BackofficePage/Logout/Logout'

function Backoffice() {

    return (
        <article className='backoffice'>
            <h1>Velkommen til Backoffice</h1>
            <BackofficeNavigation />

            <div className='backofficeContent'> 
                <Outlet /> {/* Outlet er en komponent fra react-router-dom, der bruges til at definere, hvor de "nested routes" (indlejrede ruter) skal blive renderet i applikationen */}
            </div>
            <Logout /> {/* Komponent der bruges til at logge ud af admin-delen */}
        </article>
    )
}

export default Backoffice