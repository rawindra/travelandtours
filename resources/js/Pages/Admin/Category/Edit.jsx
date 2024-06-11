import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import * as ReactIcons from 'react-icons/fa';

export default function Edit({ auth, category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        icon: category.icon,
    })

    function submit(e) {
        e.preventDefault()
        put(route('admin.categories.update', category.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Edit Category" />
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
                        <span className="label-text">Icons</span>
                        <a href="https://react-icons.github.io/react-icons/icons/fa/" target="_blank" className="label-text text-blue-500">Icon Image Url</a>
                    </div>
                    <select
                        id="icon"
                        name="icon"
                        value={data.icon}
                        className="mt-1 block max-w-xs"
                        autoComplete="icon"
                        onChange={(e) => setData("icon", e.target.value)}
                    >
                        <option value="">Select Icon</option>
                        {Object.keys(ReactIcons) &&
                            Object.keys(ReactIcons).map((icon) => {
                                return (
                                    <option value={icon} key={icon}>
                                        {icon}
                                    </option>
                                )
                            }
                            )}
                    </select>
                    {errors.name && <span className='text-red-500'>{errors.icon}</span>}
                </label>

                <PrimaryButton className='mt-4' disabled={processing}>Update</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    )
}