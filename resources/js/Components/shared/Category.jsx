import { GiMountainCave } from "react-icons/gi";

const Category = () => {
    return (
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="flex overflow-x-auto scrollbar-hide gap-2">
                <a href="#" className="pb-1 border-b-2 hover:border-b-2">
                    <GiMountainCave size={30} className="mx-auto" />
                    <span>Adventures</span>
                </a>
                <a href="#" className="pb-1 hover:border-b-2">
                    <GiMountainCave size={30} className="mx-auto" />
                    <span>Adventures</span>
                </a>
                <a href="#" className="pb-1 hover:border-b-2">
                    <GiMountainCave size={30} className="mx-auto" />
                    <span>Adventures</span>
                </a>
                <a href="#" className="pb-1 hover:border-b-2">
                    <GiMountainCave size={30} className="mx-auto" />
                    <span>Adventures</span>
                </a>
                <a href="#" className="pb-1 hover:border-b-2">
                    <GiMountainCave size={30} className="mx-auto" />
                    <span>Adventures</span>
                </a>
            </div>
        </div>
    )
}

export default Category