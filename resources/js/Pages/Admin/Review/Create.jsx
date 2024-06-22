import PrimaryButton from '@/Components/PrimaryButton';
import TinyEditor from '@/Components/TinyEditor';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function Create({ auth, packages, reviewers }) {
    const editorRef = useRef();

    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        user_id: '',
        rating: 0,
        review: ''
    })


    function submit(e) {
        e.preventDefault()
        data.review = editorRef.current.getEditorState().content
        post('/admin/reviews')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Create Product" />
            <form onSubmit={submit}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Package Name</span>
                    </div>
                    <select
                        id="package"
                        value={data.product_id}
                        className="input input-bordered max-w-xs"
                        onChange={(e) => setData("product_id", e.target.value)}
                    >
                        <option value="">Select Packages</option>
                        {packages.map((product) => {
                            return (
                                <option value={product.id} key={product.id}>
                                    {product.name}
                                </option>
                            )
                        }
                        )}
                    </select>
                    {errors.package && <span className='text-red-500'>{errors.package}</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Reviewer Name</span>
                    </div>
                    <select
                        id="user_id"
                        name="user_id"
                        value={data.user_id}
                        className="input input-bordered max-w-xs"
                        onChange={(e) => setData("user_id", e.target.value)}
                    >
                        <option value="">Select Reviewer</option>
                        {reviewers.map((reviewer) => {
                            return (
                                <option value={reviewer.id} key={reviewer.id}>
                                    {reviewer.name}
                                </option>
                            )
                        }
                        )}
                    </select>
                    {errors.user_id && <span className='text-red-500'>{errors.user_id}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rating</span>
                    </div>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="rating"
                        value={data.rating}
                        onChange={e => setData("rating", e.target.value)}
                        className="input input-bordered max-w-xs"
                    />
                    {errors.rating && <span className='text-red-500'>{errors.rating}</span>}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Long Description</span>
                    </div>
                    <TinyEditor ref={editorRef} initialValue="" />
                </label>

                <PrimaryButton className='mt-4' disabled={processing}>Create</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    )
}