import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ shortLink }) {
    const { data, setData, put, processing, errors } = useForm({
        title: shortLink.title,
        destination_url: shortLink.active_destination?.destination_url || '',
        slug: shortLink.slug,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('short-links.update', shortLink.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Edit Short Link</h2>}
        >
            <Head title="Edit Short Link" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-2xl sm:rounded-2xl">
                        <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    className="mt-2 block w-full"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="destination_url" value="Destination URL" />
                                <TextInput
                                    id="destination_url"
                                    type="url"
                                    value={data.destination_url}
                                    className="mt-2 block w-full"
                                    onChange={(e) => setData('destination_url', e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-1.5">Updating the URL preserves previous analytics and creates a new historical record.</p>
                                <InputError message={errors.destination_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="slug" value="Custom Slug" />
                                <TextInput
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    className="mt-2 block w-full font-mono"
                                    onChange={(e) => setData('slug', e.target.value)}
                                    required
                                />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end pt-4 border-t border-gray-700 space-x-3">
                                <Link href={route('dashboard')} className="text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    Save Changes
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
