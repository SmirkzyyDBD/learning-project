import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/components/public-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { about, contact, home } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

const aboutBreadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: home().url },
    { title: 'About', href: about().url },
    { title: 'Contact', href: contact().url },
];

export default function About() {
    return (
        <>
            <Head title="About" />
            <PublicLayout breadcrumbs={aboutBreadcrumbs}>
                <Card>
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                        <CardDescription>
                            A short introduction to this application.
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground leading-relaxed">
                            This is a Laravel application built with Inertia
                            and React. The about page uses shadcn/ui
                            components and follows the existing app
                            structure.
                        </p>
                    </CardContent>
                </Card>
                <Link href={home().url}>
                    <Button variant="outline">Back to home</Button>
                </Link>
            </PublicLayout>
        </>
    );
}
