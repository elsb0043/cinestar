import ContactForm from "../components/ContactPage/ContactForm/ContactForm"
import ContactText from "../components/ContactPage/ContactText/ContactText"
import SectionHeader from "../components/SectionHeader/SectionHeader"

function ContactPage() {

    return (
        <>
            <SectionHeader title='KONTAKT' />
            <ContactText />
            <ContactForm />
        </>
    )
}

export default ContactPage