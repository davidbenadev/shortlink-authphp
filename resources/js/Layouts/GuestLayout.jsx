import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-900 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="inline-flex items-center space-x-2">
                    <ApplicationLogo className="h-14 w-14 fill-current text-indigo-500 hover:text-indigo-400 transition-colors" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-gray-800 border border-gray-700/80 px-6 py-6 shadow-2xl sm:max-w-md sm:rounded-2xl text-gray-100">
                {children}
            </div>
        </div>
    );
}
