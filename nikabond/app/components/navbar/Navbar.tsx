import Link from 'next/link';
import Logo from './Logo';
import SearchFilters from './SearchFilters';
import User from './User';
import { getUserId } from '@/app/lib/actions';

const Navbar = async () => {
    const userId = await getUserId();
    return (
        <nav className="w-full fixed top-0 left-0 py-2 border-gray-300 bg-lime-100 z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div className="px-1">
                        <Logo />
                    </div>

                    <div className="flex space-x-6">
                        <SearchFilters />
                    </div>

                    <div className="ml-2 flex items-center space-x-2">
                        <Link href="/inbox/1" className="cursor-pointer text-gray-600 hover:text-airbnb-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </Link>
                        <User
                            userId={userId}
                        />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;