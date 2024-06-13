import Pagination from "@/Components/Pagination"
import ProductCard from "@/Components/ProductCard"
import FrontLayout from "@/Layouts/FrontLayout"
import { Head } from "@inertiajs/react"

const Home = ({ products }) => {
    return (
        <FrontLayout>
            <Head title="Home" />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products && products.data.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <Pagination links={products.links} />
            </div>
        </FrontLayout>
    )
}

export default Home