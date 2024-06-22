import DangerButton from '@/Components/DangerButton';
import LinkAsButton from '@/Components/LinkAsButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, reviews, app }) {
    console.log(reviews);

    const { delete: destroy, processing } = useForm()

    function submit(e, review) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/reviews/${review.id}`)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Review" />
            <LinkAsButton href={route('admin.reviews.create')} className="">Create</LinkAsButton>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Reviewer Name</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.data.map(review => (
                            <tr key={review.id}>
                                <td>{review.product.name}</td>
                                <td>{review.user.name}</td>
                                <td>{review.rating}</td>
                                <td>{review.review}</td>
                                <td className='flex items-center gap-2'>
                                    <LinkAsButton href={route('admin.reviews.edit', review.id)} className="bg-yellow-500 btn-xs">Edit</LinkAsButton>
                                    <form onSubmit={(event) => submit(event, review)}>
                                        <DangerButton className="btn-xs" disabled={processing}>Delete</DangerButton>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={reviews.links} />
            </div>

        </AuthenticatedLayout>
    )
}