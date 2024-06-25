import React from 'react'
import DangerButton from '@/Components/DangerButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Images = ({ auth, product, app }) => {

    const { data, setData, processing, errors, reset } = useForm({
        image: '',
    })

    const { delete: destroy, processing: destroyProcessing } = useForm()


    function submit(e) {
        e.preventDefault()
        router.post(route('admin.products.images.upload', product.id), {
            ...data
        }, {
            preserveState: false,
        })
    }

    function handleDelete(e, image) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/products/${product.id}/images/${image.id}`)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Product Images" />
            <form onSubmit={submit}>
                <label htmlFor="">Upload Images</label>
                <div className='mt-2'>
                    <input
                        type="file"
                        onChange={e => { setData('image', e.target.files[0]) }}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {errors.image && <span className='text-red-500'>{errors.image}</span>}
                </div>
                <PrimaryButton className='mt-4' disabled={processing}>Upload</PrimaryButton>
            </form>
            <div className='grid grid-cols-4 mt-2 mb-2'>
                {product.images.length > 0 && product.images.map(image => (

                    <div key={image.id} className='mb-2'>
                        <img src={app.storage_url + '/' + image.image} className='h-[280px] w-[280px]' />
                        <form onSubmit={(event) => handleDelete(event, image)}>
                            <DangerButton className="btn-xs mt-2" disabled={destroyProcessing}>Delete</DangerButton>
                        </form>
                    </div>
                ))
                }
            </div>

        </AuthenticatedLayout>
    )
}

export default Images