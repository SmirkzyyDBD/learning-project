import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { about, dashboard, home, login, register } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItemType[];
    canRegister?: boolean;
};

export function PublicNavbar({ breadcrumbs = [], canRegister = true }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4">
                <div className="flex items-center gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                aria-label="Open menu"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 pt-4">
                                <Button variant="ghost" className="justify-start" asChild>
                                    <Link href={home().url}>Home</Link>
                                </Button>
                                <Button variant="ghost" className="justify-start" asChild>
                                    <Link href={about().url}>About</Link>
                                </Button>
                                {auth.user ? (
                                    <Button variant="ghost" className="justify-start" asChild>
                                        <Link href={dashboard().url}>Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="ghost" className="justify-start" asChild>
                                            <Link href={login().url}>Log in</Link>
                                        </Button>
                                        {canRegister && (
                                            <Button variant="ghost" className="justify-start" asChild>
                                                <Link href={register().url}>Register</Link>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link
                        href={home().url}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {import.meta.env.VITE_APP_NAME || 'Laravel'}
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <Link href={dashboard().url}>
                            <Button size="sm">Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={login().url}>
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            {canRegister && (
                                <Link href={register().url}>
                                    <Button size="sm">Register</Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </header>
            {breadcrumbs.length > 0 && (
                <div className="flex border-b border-border px-4 py-3">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            )}
        </>
    );
}
