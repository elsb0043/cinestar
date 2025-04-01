import Awards from "../components/HomePage/Awards/Awards"
import CinestarStudio from "../components/HomePage/CinestarStudio/CinestarStudio"
import History from "../components/HomePage/History/History"
import LatestBlog from "../components/HomePage/LatestBlog/LatestBlog"
import Meeting from "../components/HomePage/Meeting/Meeting"
import PageHeader from "../components/HomePage/PageHeader/PageHeader"
import Portfolio from "../components/HomePage/Portfolio/Portfolio"
import Reviews from "../components/HomePage/Reviews/Reviews"
import Services from "../components/HomePage/Services/Services"

function HomePage() {

    return (
        <>
            <PageHeader />
            <Awards />
            <CinestarStudio />
            <Portfolio />
            <Services />
            <History />
            <Reviews />
            <Meeting />
            <LatestBlog />
        </>
    )
}

export default HomePage