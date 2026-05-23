import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={
                "inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 " +
                "hover:bg-blue-700 active:bg-blue-800 " +
                className
            }
        />
    );
}

export function SecondaryButton({
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={
                "inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 " +
                "hover:bg-gray-50 active:bg-gray-100 " +
                className
            }
        />
    );
}

