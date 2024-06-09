import ProductCard from "@/Components/ProductCard"
import FrontLayout from "@/Layouts/FrontLayout"
import { Head } from "@inertiajs/react"

const Home = () => {
    return (
        <FrontLayout>
            <Head title="Home" />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </FrontLayout>
    )
}

export default Home