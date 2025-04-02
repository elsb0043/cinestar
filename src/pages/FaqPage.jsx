import CinestarSpecial from "../components/FaqPage/CinestarSpecial/CinestarSpecial"
import Faqs from "../components/FaqPage/Faqs/Faqs"
import FaqText from "../components/FaqPage/FaqText/FaqText"
import SectionHeader from "../components/SectionHeader/SectionHeader"

function FaqPage() {

    return (
        <>
            <SectionHeader title='FAQ' />
            <FaqText />
            <CinestarSpecial />
            <Faqs />
        </>
    )
}

export default FaqPage