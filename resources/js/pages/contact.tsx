"use client"

import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/components/public-layout';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { about, contact, home } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { CustomHeading } from '@/components/custom-heading';

const contactBreadcrumbs: BreadcrumbItemType[] = [
    { title: 'Home', href: home().url },
    { title: 'About', href: about().url },
    { title: 'Contact', href: contact().url },
];

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Name is required.")
        .max(32, "Name must be at most 32 characters."),
    email: z
        .string()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
    message: z
        .string()
        .min(20, "Message must be at least 20 characters.")
        .max(1000, "Message must be at most 1000 characters."),
})

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            email: "",
            message: "",
        },
    })
    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }
    return (
        <>
            <Head title="Contact" />
            <PublicLayout breadcrumbs={contactBreadcrumbs}>
                <div className="mb-6">
                    <CustomHeading>We'd love to hear from you!</CustomHeading>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Contact us for any questions or feedback.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Form</CardTitle>
                        <CardDescription>
                            Contact us for any questions or feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="title"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                Name
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-title"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="John Doe"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                            className="mb-0" // Remove any default Field margin
                                        >
                                            <FieldLabel
                                                htmlFor="form-rhf-demo-email"
                                                className="mb-1" // Keep label snug with input
                                            >
                                                Email
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="john.doe@example.com"
                                                autoComplete="off"
                                                className="mb-1 focus:border-none"
                                            />
                                            <div className="flex flex-col gap-0">
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                                <FieldDescription className={fieldState.invalid ? "mt-0" : "mt-0"}>
                                                    We'll use this email to respond to your message.
                                                </FieldDescription>
                                            </div>
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="message"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-message">
                                                Message
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    id="form-rhf-demo-message"
                                                    placeholder="I have a question about the product."
                                                    rows={6}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field.value.length} characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Field orientation="horizontal">
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit" form="form-rhf-demo">
                                Submit
                            </Button>
                        </Field>
                    </CardFooter>
                </Card>
            </PublicLayout >
        </>)
}