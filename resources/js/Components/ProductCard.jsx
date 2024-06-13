import { Link, usePage } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const app = usePage().props.app
    return (
        <Link href={route('product.show')}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full h-[200px]" src={app.storage_url + '/' + product.image} alt={product.name} />
                <div className="py-4">
                    <div className='text-md mb-2'>From ${product.price}</div>
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <div className="flex flex-wrap items-center gap-1">
                        <FaStar className="w-3 sm:w-3.5" />
                        <div className="flex gap-[7px] ml-1 items-center">
                            <div className="text-sm 2xl:text-standard">
                                5.0
                            </div>
                            <div className="p-[1.5px] md:p-[2px] rounded-full bg-gray-500"></div>
                            <span className="text-sm 2xl:text-standard text-gray-700 dark:text-gray-400">
                                237 Ratings
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard