"use client";

import { motion } from "framer-motion";

export default function ComingSoonCard({ id, index, title, delay = 0 }: { id: string; index: string; title: string; delay?: number }) {
  return (
    <motion.section
      id={id}
      className="relative w-full scroll-mt-28"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-full bg-surface-container-low rounded-[24px] p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <span className="font-headline-sm font-extrabold text-primary-container text-xl sm:text-2xl">{index}</span>
        <h3 className="font-headline-lg uppercase text-on-surface font-extrabold tracking-tight text-2xl sm:text-3xl">{title}</h3>
        <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest font-bold">
          Coming Soon
        </span>
      </motion.div>
    </motion.section>
  );
}
