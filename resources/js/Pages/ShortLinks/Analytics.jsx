import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Analytics({ shortLink, totalClicks, clicksOverTime, destinations }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const fullUrl = `${window.location.origin}/${shortLink.slug}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white">
                        Analytics: <span className="text-indigo-400">{shortLink.title}</span>
                    </h2>
                    <Link href={route('dashboard')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        &larr; Back to Dashboard
                    </Link>
                </div>
            }
        >
            <Head title={`Analytics - ${shortLink.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-xl sm:rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Clicks</h3>
                            <p className="mt-3 text-4xl font-bold text-indigo-400">{totalClicks}</p>
                        </div>

                        <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-xl sm:rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Short URL</h3>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-gray-300 bg-gray-700/80 hover:bg-gray-700 border border-gray-600 transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-emerald-400 font-semibold">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10a2 2 0 00-2 2v3a2 2 0 002 2h8a2 2 0 002-2v-3a2 2 0 00-2-2z" />
                                            </svg>
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <a href={`/${shortLink.slug}`} target="_blank" rel="noreferrer" className="mt-3 block text-xl font-mono text-indigo-400 hover:text-indigo-300 hover:underline break-all transition-colors">
                                {window.location.origin}/{shortLink.slug}
                            </a>
                        </div>

                        <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-xl sm:rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">QR Code</h3>
                                <a
                                    href={`/storage/${shortLink.qr_code_path}`}
                                    download
                                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline mt-2 inline-flex items-center space-x-1 transition-colors"
                                >
                                    <span>Download SVG</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            </div>
                            {shortLink.qr_code_path && (
                                <div className="bg-white p-2 rounded-xl shadow-md">
                                    <img src={`/storage/${shortLink.qr_code_path}`} alt="QR Code" className="h-16 w-16" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Historical Destinations */}
                    <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-xl sm:rounded-2xl">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Destination History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700/80">
                                    <thead className="bg-gray-900/60">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">URL</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Clicks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/60 bg-gray-800">
                                        {destinations.map(dest => (
                                            <tr key={dest.id} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{dest.destination_url}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {dest.is_active ? 
                                                        <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span> :
                                                        <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700/50 text-gray-400 border border-gray-600/30">Inactive</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                        {dest.clicks_count} {dest.clicks_count === 1 ? 'click' : 'clicks'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Simple Chart (Table format for now) */}
                    <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-xl sm:rounded-2xl">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Clicks over time (Last 30 Days)</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700/80">
                                    <thead className="bg-gray-900/60">
                                        <tr>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Clicks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/60 bg-gray-800">
                                        {clicksOverTime.map((stat, idx) => (
                                            <tr key={idx} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stat.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                        {stat.count}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {clicksOverTime.length === 0 && (
                                            <tr>
                                                <td colSpan="2" className="px-6 py-8 text-center text-gray-400">No clicks recorded in the last 30 days.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
