"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type SecondaryLink = { icon: string; label: string; href: string };

export type BranchCardData = {
  index: string; // "01"
  anchorId: string; // "unity-motor"
  title: string;
  mapsUrl: string;
  statusTag: string;
  image: { src: string; alt: string };
  description: string;
  cta: { label: string; icon: string; href: string };
  secondaryLinks: SecondaryLink[];
};

// `id` has no default here on purpose: explicit `id={undefined}` from a
// caller (the desktop stacked copy, which must NOT get a real id since the
// mobile sequential copy already owns the one real `#anchorId` in the DOM)
// must stay undefined. A default parameter triggers on `undefined` too, so
// `id = data.anchorId` would silently defeat that and duplicate the id.
export default function BranchCard({ data, id }: { data: BranchCardData; id?: string }) {
  return (
    <section id={id} className="relative w-full px-margin-mobile lg:px-margin bg-surface-container-lowest scroll-mt-28">
      <div className="w-full flex flex-wrap items-end justify-between gap-x-4 gap-y-2 mb-6">
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="font-headline-sm font-extrabold text-primary-container text-xl sm:text-2xl shrink-0">{data.index}</span>
          <h2
            className="font-headline-lg uppercase text-on-surface font-extrabold tracking-tight break-words min-w-0"
            style={{ fontSize: "clamp(1.5rem, 8vw, 3.5rem)", lineHeight: 0.98 }}
          >
            {data.title}
          </h2>
        </div>
        <span className="shrink-0 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">{data.statusTag}</span>
      </div>

      <div className="w-full bg-surface-container-low rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.75)] relative overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[520px] bg-surface-container-high">
          <a href={data.mapsUrl} rel="noopener" target="_blank" title="Open in Google Maps" className="absolute inset-0 block group overflow-hidden">
            {data.image.src ? (
              <Image
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fill
                quality={92}
                sizes="(min-width: 1024px) 900px, 100vw"
                alt={data.image.alt}
                src={data.image.src}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl">photo_camera</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Photos coming soon</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </a>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <p className="font-body-md text-on-surface-variant font-normal leading-relaxed text-base sm:text-lg max-w-xl">{data.description}</p>

          <motion.a
            className="group w-fit flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold"
            href={data.cta.href}
            rel="noopener"
            target="_blank"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <span className="material-symbols-outlined text-xl">{data.cta.icon}</span>
            {data.cta.label}
          </motion.a>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {data.secondaryLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                rel="noopener"
                target="_blank"
                className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary-container transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
