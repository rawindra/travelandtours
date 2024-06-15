import { Link, usePage } from "@inertiajs/react"

const Footer = () => {
    const auth = usePage().props.auth

    return (
        <div className="fixed bottom-0 w-full p-4 bg-gray-800">
            <p className="hidden md:block text-center text-gray-200">Copyright &copy; 2024. All Rights Reserved.</p>
            <div className="flex justify-between block md:hidden">
                <p className="text-yellow-500">Travel and Tour</p>
                {auth.user ?
                    <div className="flex">
                        <Link href="#" className="mr-2 text-green-500">Bookings</Link>
                        <Link href={route('logout')} method="post" as="button" className="text-red-500">Logout</Link>
                    </div>
                    :
                    <div className="flex gap-2">
                        <Link href={route('login')} className="mr-2 text-orange-500">Login</Link>
                        <Link href={route('register')} className="text-green-500">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Footer