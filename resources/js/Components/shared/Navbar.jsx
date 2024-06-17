import { Link, usePage } from "@inertiajs/react"

const Navbar = () => {
    const auth = usePage().props.auth
    return (
        <div className="sticky top-0 z-50 bg-gray-800">
            <nav className="border-gray-200">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link href="/" className="hidden md:block flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">Travel and Tour</span>
                    </Link>
                    <div>
                        <input type="search" className="w-[300px] md:w-[400px] focus:outline-none p-2 pl-10 text-sm dark:text-gray-900 rounded-lg" name="search" placeholder="Search Tour And Activities..." />
                        <svg width="24" height="24" fill="none" aria-hidden="true" className="absolute top-1/3 mx-3 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                    </div>
                    {auth.user ?
                        <div className="flex hidden md:block">
                            <Link href={route('bookings')} className="mr-2 text-green-500">Bookings</Link>
                            <Link href={route('logout')} method="post" as="button" className="text-red-500">Logout</Link>
                        </div>
                        :
                        <div className="flex hidden md:block">
                            <Link href={route('login')} className="mr-2 text-orange-500">Login</Link>
                            <Link href={route('register')} className="text-green-500">Register</Link>
                        </div>
                    }

                </div>
            </nav>
        </div>
    )
}

export default Navbar