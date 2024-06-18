import PrimaryButton from '@/Components/PrimaryButton';
import TinyEditor from '@/Components/TinyEditor';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Edit({ auth, categories, product }) {
    const editorRef = useRef();

    const { data, setData, processing, errors } = useForm({
        name: product.name,
        excerpt: product.excerpt,
        image: {},
        price: product.price,
        category_id: product.category_id,
    })

    function submit(e) {
        e.preventDefault()

        data.description = editorRef.current.getEditorState().content

        router.post(route('admin.products.update', product.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Edit Product" />
            <form onSubmit={submit}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="input input-bordered max-w-xs"
                    />
                    {errors.name && <span className='text-red-500'>{errors.name}</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Short Description</span>
                    </div>
                    <textarea
                        value={data.excerpt}
                        onChange={e => setData('excerpt', e.target.value)}
                        className="input input-bordered max-w-xs"
                    ></textarea>
                    {errors.excerpt && <span className='text-red-500'>{errors.excerpt}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Categories</span>
                    </div>
                    <select
                        id="category"
                        value={data.category_id}
                        className="input input-bordered max-w-xs"
                        onChange={(e) => setData("category_id", e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => {
                            return (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            )
                        }
                        )}
                    </select>
                    {errors.category_id && <span className='text-red-500'>{errors.category_id}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Price</span>
                    </div>
                    <input
                        type="number"
                        min={1}
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.price && <span className='text-red-500'>{errors.price}</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pick a Image</span>
                    </div>
                    <input
                        type="file"
                        onChange={e => { setData('image', e.target.files[0]) }}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {errors.image && <span className='text-red-500'>{errors.image}</span>}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Long Description</span>
                    </div>
                    <TinyEditor ref={editorRef} initialValue={product.description} />
                </label>

                <PrimaryButton className='mt-4' disabled={processing}>Update</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    )
}