import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/components/public-layout';
import { home } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

const welcomeBreadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: home().url },
    { title: 'Welcome', href: home().url },
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Welcome" />
            <PublicLayout breadcrumbs={welcomeBreadcrumbs} canRegister={canRegister}>
                <h1 className="text-2xl font-semibold">Welcome</h1>
                <p className="text-muted-foreground">
                    Use the menu icon to open navigation, or the links in the
                    header to log in or open the dashboard.
                </p>
            </PublicLayout>
        </>
    );
}
