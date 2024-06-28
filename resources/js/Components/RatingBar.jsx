import React from 'react'

const RatingBar = ({ width, star }) => {
    return (
        <div className="flex md:gap-3 items-center my-1">
            <div className="w-20 whitespace-nowrap text-gray-700 dark:text-gray-400 font-medium">{star} stars</div>
            <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700 border border-gray-500">
                <div style={{ width: width + "%" }} className="bg-black dark:bg-gray-200 h-full rounded-md"></div>
            </div>
        </div>
    )
}

export default RatingBar