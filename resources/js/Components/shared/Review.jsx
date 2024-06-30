import React from 'react'
import { FaStar } from 'react-icons/fa'
import RatingBar from '../RatingBar'

const Review = ({ reviews }) => {
    return (
        <div>
            <div className="mt-4 text-med md:text-lg font-semibold">
                Customer Ratings
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex gap-2 md:gap-0 md:flex-col pb-2 items-center md:justify-center md:pb-0">
                    <div className="text-lg md:text-4xl font-semibold md:pt-1.5">
                        5.0
                    </div>
                    <div className="flex flex-wrap items-center gap-1 md:pt-1.5">
                        <FaStar className="w-3 sm:w-3.5" />
                        <FaStar className="w-3 sm:w-3.5" />
                        <FaStar className="w-3 sm:w-3.5" />
                        <FaStar className="w-3 sm:w-3.5" />
                        <FaStar className="w-3 sm:w-3.5" />
                    </div>
                    <div className="text-base md:text-lg text-gray-600 md:pt-1.5">
                        11 Ratings
                    </div>
                </div>
                <div className='w-full'>
                    <RatingBar width={100} star={5} />
                    <RatingBar width={75} star={4} />
                    <RatingBar width={50} star={3} />
                    <RatingBar width={25} star={2} />
                    <RatingBar width={0} star={1} />
                </div>
            </div>
            {
                reviews.map((review, index) => {
                    return (

                        <div className='mb-4'>
                            <div className='flex gap-2'>
                                <div className="mr-2 font-semibold text-orange-500">
                                    {review.user.name}
                                </div>
                                <div className="flex flex-wrap items-center gap-1 md:pt-1.5">
                                    {[...Array(review.rating)].map((_, index) => (
                                        <FaStar className="w-3 sm:w-3.5" index={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="ml-auto text-sm text-gray-700 dark:text-gray-400">
                                {new Date(review.created_at).toDateString()}
                            </div>
                            <div className="no-tailwindcss-base" dangerouslySetInnerHTML={{ __html: review.review }}>
                            </div>
                        </div>
                    )
                })
            }
           
        </div>
    )
}

export default Review