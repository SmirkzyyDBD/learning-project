import type { ReactNode } from 'react';
import { PublicNavbar } from '@/components/public-navbar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItemType[];
    canRegister?: boolean;
    children: ReactNode;
};

export function PublicLayout({
    breadcrumbs = [],
    canRegister = true,
    children,
}: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <PublicNavbar breadcrumbs={breadcrumbs} canRegister={canRegister} />
            <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
                {children}
            </main>
        </div>
    );
}
