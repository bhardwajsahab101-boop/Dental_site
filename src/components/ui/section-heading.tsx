import type { ReactNode } from "react";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: ReactNode;
};

export default function SectionHeading({
    eyebrow,
    title,
    description,
}: SectionHeadingProps) {
    return (
        <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
                {eyebrow}
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
                {title}
            </h2>
            {description ? (
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

