import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        destination_url: '',
        slug: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('short-links.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Create Short Link</h2>}
        >
            <Head title="Create Short Link" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-gray-800 border border-gray-700/80 overflow-hidden shadow-2xl sm:rounded-2xl">
                        <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Title (Internal Identifier)" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-2 block w-full"
                                    placeholder="e.g. Summer Campaign 2026"
                                    isFocused={true}
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
                                    name="destination_url"
                                    value={data.destination_url}
                                    className="mt-2 block w-full"
                                    placeholder="https://example.com/long-page-url"
                                    onChange={(e) => setData('destination_url', e.target.value)}
                                    required
                                />
                                <InputError message={errors.destination_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="slug" value="Custom Slug (Optional)" />
                                <TextInput
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    className="mt-2 block w-full font-mono"
                                    placeholder="Leave empty for auto-generated slug"
                                    onChange={(e) => setData('slug', e.target.value)}
                                />
                                <p className="text-xs text-gray-400 mt-1.5">Only alphanumeric characters and dashes (a-z, 0-9, -)</p>
                                <InputError message={errors.slug} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end pt-4 border-t border-gray-700 space-x-3">
                                <Link href={route('dashboard')} className="text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    Create Link
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
