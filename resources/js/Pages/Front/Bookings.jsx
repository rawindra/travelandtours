import DangerButton from '@/Components/DangerButton'
import FrontLayout from '@/Layouts/FrontLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const Bookings = ({ bookings }) => {
    const { delete: destroy, processing } = useForm()

    function submit(e, booking) {
        e.preventDefault()
        confirm('Are you sure?') && destroy(`/bookings/${booking.id}`)
    }

    return (
        <FrontLayout>
            <Head title="Bookings Detail" />
            <div className="max-w-screen-xl mx-auto p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.product.name}</td>
                                <td>{booking.date}</td>
                                <td>{booking.quantity}</td>
                                <td className='flex items-center gap-2'>
                                    <form onSubmit={(event) => submit(event, booking)}>
                                        <DangerButton className="btn-xs" disabled={processing}>Delete</DangerButton>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </FrontLayout>
    )
}

export default Bookings