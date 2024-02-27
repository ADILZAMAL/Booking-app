import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import PropTypes from 'prop-types'

const Layout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.element,
}

export default Layout