import DangerButton from '@/Components/DangerButton';
import LinkAsButton from '@/Components/LinkAsButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, products, app }) {
    const { delete: destroy, processing } = useForm()

    function submit(e, product) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/admin/products/${product.id}`)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Product" />
            <LinkAsButton href={route('admin.products.create')} className="">Create</LinkAsButton>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Excerpt</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <img src={app.storage_url + '/' + product.image} alt={product.name} className='size-16' />
                                </td>
                                <td className='truncate'>{product.excerpt}</td>
                                <td>{product.price}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <LinkAsButton href={route('admin.products.images', product.id)} className="bg-blue-500 btn-xs mr-2">Images</LinkAsButton>
                                    <LinkAsButton href={route('admin.products.edit', product.id)} className="bg-yellow-500 btn-xs mr-2">Edit</LinkAsButton>
                                    <form onSubmit={(event) => submit(event, product)} className='inline'>
                                        <DangerButton className="btn-xs" disabled={processing}>Delete</DangerButton>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={products.links} />
            </div>

        </AuthenticatedLayout>
    )
}