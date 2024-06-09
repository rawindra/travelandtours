import Category from "@/Components/shared/Category"
import Footer from "@/Components/shared/Footer"
import Navbar from "@/Components/shared/Navbar"

const FrontLayout = ({ children }) => {
    return (
        <div className="bg-white antialiased min-h-screen w-full dark:bg-gray-900 dark:text-gray-200">
            <Navbar />
            <Category />
            {children}
            <Footer />
        </div>
    )
}

export default FrontLayout