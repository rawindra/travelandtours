/**
 * The `Review` component displays a review section with customer ratings, a rating bar, and individual reviews.
 * It uses the `useForm` hook from the `@inertiajs/react` library to manage the state of the review form.
 * The component receives an array of `reviews` as a prop, which it maps and renders as individual review items.
 * The review form allows the user to select a rating and write a review, which is submitted using the `handleSubmit` function.
 */
import React from 'react'
import { FaStar } from 'react-icons/fa'
import RatingBar from '../RatingBar'
import { useForm } from '@inertiajs/react'

const Review = ({ reviews, product, avgRating }) => {
    const { data, setData, post, processing, errors } = useForm({
        rating: 0,
        review: '',
        product: product.id,
    })

    const calculatePercentageOfRating = (rating) => {
        let numbersOfRating = reviews.filter(review => review.rating === rating).length
        return (numbersOfRating / reviews.length) * 100
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/submit-review', data)
        data.review = '';
    }

    return (
        <div>
            <div className="mt-4 text-med md:text-lg font-semibold">
                Customer Ratings
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex gap-2 md:gap-0 md:flex-col pb-2 items-center md:justify-center md:pb-0">
                    <div className="text-lg md:text-4xl font-semibold md:pt-1.5">
                        {avgRating}
                    </div>
                    <div className="flex flex-wrap items-center gap-1 md:pt-1.5">
                        {[...Array(5)].map((_, index) => (
                            <FaStar className="w-3 sm:w-3.5" index={index} />
                        ))}
                    </div>
                    <div className="text-base md:text-lg text-gray-600 md:pt-1.5">
                        {reviews.length} Ratings
                    </div>
                </div>
                <div className='w-full'>
                    
                    <RatingBar width={calculatePercentageOfRating(5)} star={5} />
                    <RatingBar width={calculatePercentageOfRating(4)} star={4} />
                    <RatingBar width={calculatePercentageOfRating(3)} star={3} />
                    <RatingBar width={calculatePercentageOfRating(2)} star={2} />
                    <RatingBar width={calculatePercentageOfRating(1)} star={1} />
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

            <form className='grid cols-1 md:grid-cols-1' onSubmit={handleSubmit}>
                <div className="rating mb-2">

                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={1} onChange={(e) => setData('rating', e.target.value)} />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        onChange={(e) => setData('rating', e.target.value)}
                        defaultChecked />



                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={3} onChange={(e) => setData('rating', e.target.value)} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={4} onChange={(e) => setData('rating', e.target.value)} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={5} onChange={(e) => setData('rating', e.target.value)} />
                </div>
                <textarea 
                    className="textarea textarea-primary mb-2" 
                    placeholder="write your review" 
                    value={data.review}
                    onChange={(e) => setData('review', e.target.value)}
                ></textarea>

                <button className="btn btn-outline w-16" disabled={processing}>Submit</button>
            </form>
           
        </div>
    )
}

export default Review