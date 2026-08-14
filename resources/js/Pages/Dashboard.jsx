import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ links }) {
    const { delete: destroy } = useForm();
    const [copiedSlug, setCopiedSlug] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this short link?')) {
            destroy(route('short-links.destroy', id));
        }
    };

    const handleCopy = (slug) => {
        const fullUrl = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white">
                        Dashboard
                    </h2>
                    <Link
                        href={route('short-links.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition ease-in-out duration-150 shadow-lg shadow-indigo-600/20"
                    >
                        Create Link
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-800 border border-gray-700/80 shadow-xl sm:rounded-2xl">
                        <div className="p-6 text-gray-100">
                            {links.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <p className="mt-4 text-base font-medium text-gray-300">No short links yet</p>
                                    <p className="mt-1 text-sm text-gray-400">Get started by creating your first link.</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('short-links.create')}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                                        >
                                            + Create Short Link
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700/80">
                                        <thead className="bg-gray-900/60">
                                            <tr>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Short Link</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Clicks</th>
                                                <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700/60 bg-gray-800">
                                            {links.map((link) => (
                                                <tr key={link.id} className="hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{link.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        <div className="flex items-center space-x-2">
                                                            <a href={`/${link.slug}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 font-mono transition-colors">
                                                                /{link.slug}
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopy(link.slug)}
                                                                className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-300 bg-gray-700/80 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
                                                                title="Copy short link"
                                                            >
                                                                {copiedSlug === link.slug ? (
                                                                    <span className="text-emerald-400 font-semibold">Copied!</span>
                                                                ) : (
                                                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10a2 2 0 00-2 2v3a2 2 0 002 2h8a2 2 0 002-2v-3a2 2 0 00-2-2z" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                            {link.clicks_count} {link.clicks_count === 1 ? 'click' : 'clicks'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-3">
                                                        <Link href={route('short-links.analytics', link.id)} className="text-indigo-400 hover:text-indigo-300 transition-colors">Analytics</Link>
                                                        <Link href={route('short-links.edit', link.id)} className="text-amber-400 hover:text-amber-300 transition-colors">Edit</Link>
                                                        <button onClick={() => handleDelete(link.id)} className="text-rose-400 hover:text-rose-300 transition-colors">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
