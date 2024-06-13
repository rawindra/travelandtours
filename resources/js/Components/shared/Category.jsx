import { usePage } from "@inertiajs/react";
import GetIcon from "../Icon";

const Category = () => {
    const { props } = usePage();
    const categories = props.categories
    return (
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="flex overflow-x-auto scrollbar-hide gap-2">
                {categories && categories.map(category => (

                    <a href="#" className="pb-1 border-b-2 hover:border-b-2" key={category.id}>
                        <GetIcon icon={category.icon} size={30} className="mx-auto" />
                        <span>{category.name}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Category