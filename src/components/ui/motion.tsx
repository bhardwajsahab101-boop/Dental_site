"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeUpProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
};

export function FadeUp({ children, className = "", delayMs = 0 }: FadeUpProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: delayMs / 1000 }}
        >
            {children}
        </motion.div>
    );
}

