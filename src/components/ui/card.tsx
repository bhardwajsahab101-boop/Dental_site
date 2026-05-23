import type { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={
                "rounded-3xl border border-gray-100 bg-white shadow-sm " +
                "transition will-change-transform " +
                "hover:-translate-y-0.5 hover:shadow-md " +
                className
            }
        >
            {children}
        </div>
    );
}

