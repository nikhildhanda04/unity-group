"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type Review = { quote: string; author: string };

export type Social = { icon: string; label: string; value: string; href: string };

export type QuickAction = { icon: string; label: string; href: string };

export type BranchCardData = {
  index: string; // "01"
  anchorId: string; // "unity-motor"
  title: string;
  locTag: string;
  mapsUrl: string;
  statusTag: string;
  image: { src: string; alt: string };
  imageTags: Array<{ text: string; accent?: boolean }>;
  isoFigure?: ReactNode;
  description: string;
  actions?: QuickAction[];
  cta: { titleEn: string; sub: string; tagText: string; href: string };
  phone?: { display: string; href: string };
  rating?: string;
  reviewCountLabel?: string;
  reviewLink?: string;
  reviews?: Review[];
  socials: Social[];
  footerLeft: string;
  footerRight: string;
};

export default function BranchCard({ data, id = data.anchorId }: { data: BranchCardData; id?: string }) {
  const [reviewIdx, setReviewIdx] = useState(0);
  const reviews = data.reviews ?? [];

  function prevReview() {
    setReviewIdx((i) => (i - 1 + reviews.length) % reviews.length);
  }

  function nextReview() {
    setReviewIdx((i) => (i + 1) % reviews.length);
  }

  return (
    <section id={id} className="relative w-full px-margin-mobile lg:px-margin bg-surface-container-lowest scroll-mt-28">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg uppercase text-on-surface font-extrabold tracking-tight" style={{ fontSize: "clamp(2.25rem, 9vw, 4rem)", lineHeight: 0.98 }}>
            {data.title}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors group"
            href={data.mapsUrl}
            rel="noopener"
            target="_blank"
            title="Open in Google Maps"
          >
            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">location_on</span>
            {data.locTag}
          </a>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">{data.statusTag}</span>
        </div>
      </div>

      <div className="w-full bg-surface-container-low rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.75)] relative overflow-hidden p-5 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[480px] w-full rounded-xl overflow-hidden relative group">
            <a href={data.mapsUrl} rel="noopener" target="_blank" title="Open in Google Maps" className="absolute inset-0 block">
              {data.image.src ? (
                <Image
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={data.image.alt}
                  src={data.image.src}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-container-high text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl">photo_camera</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Business photos pending</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              {data.isoFigure && (
                <div className="hidden md:block absolute bottom-4 left-4 w-32 opacity-80 pointer-events-none select-none">{data.isoFigure}</div>
              )}
              <div className="absolute top-4 left-4 right-4 flex flex-col items-start gap-1.5">
                {data.imageTags.map((tag, i) => (
                  <span
                    key={i}
                    className={
                      tag.accent
                        ? "max-w-full px-3 py-1 rounded-full bg-white text-black font-label-sm text-label-sm uppercase font-black"
                        : "max-w-full px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-label-sm uppercase font-bold"
                    }
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 font-label-sm text-label-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{data.locTag}</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  VIEW ON MAP
                </span>
              </div>
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-base">{data.description}</p>
            </div>

            {data.actions && data.actions.length > 0 && (
              <div className={`grid gap-3 ${data.actions.length >= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                {data.actions.map((action, i) => (
                  <a
                    key={i}
                    href={action.href}
                    rel="noopener"
                    target="_blank"
                    className="group p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center gap-1.5 text-center py-4"
                  >
                    <span className="material-symbols-outlined text-on-surface text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface">{action.label}</span>
                  </a>
                ))}
              </div>
            )}

            <a
              className="w-full p-4 sm:p-5 rounded-2xl bg-on-surface text-surface shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
              href={data.cta.href}
              rel="noopener"
              target="_blank"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-2xl shrink-0">calendar_month</span>
                <div className="min-w-0">
                  <div className="font-headline-sm font-black uppercase tracking-tight" style={{ fontSize: "clamp(1.3rem, 6vw, 1.75rem)", lineHeight: 1.05 }}>
                    {data.cta.titleEn}
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-surface/70">{data.cta.sub}</div>
                </div>
              </div>
              <span className="shrink-0 font-label-md text-label-md uppercase font-black bg-surface/10 text-surface px-3 py-1.5 rounded-full">
                {data.cta.tagText}
              </span>
            </a>

            {data.phone && (
              <a
                className="group flex items-center justify-between p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors"
                href={data.phone.href}
              >
                <span className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg text-on-surface">call</span>
                  Call Direct
                </span>
                <span className="font-headline-sm font-bold text-on-surface tracking-wide text-base sm:text-lg group-hover:underline">{data.phone.display}</span>
              </a>
            )}

            {reviews.length > 0 && (
              <div className="bg-surface-container rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {data.rating && <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-black font-label-sm text-label-sm font-black">{data.rating}</span>}
                    {data.reviewCountLabel && <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">{data.reviewCountLabel}</span>}
                  </div>
                  {data.reviewLink && (
                    <a className="text-on-surface hover:underline font-label-sm text-label-sm uppercase font-bold flex items-center gap-1" href={data.reviewLink} rel="noopener" target="_blank">
                      WRITE REVIEW <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  )}
                </div>
                <div className="bg-surface-container-high rounded-xl p-4 transition-all duration-300">
                  <p className="font-body-sm text-on-surface italic">{reviews[reviewIdx].quote}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-container-highest">
                    <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">{reviews[reviewIdx].author}</span>
                    {reviews.length > 1 && (
                      <div className="flex items-center gap-1">
                        <button className="w-6 h-6 rounded-full bg-surface hover:bg-surface-bright text-on-surface text-xs font-bold flex items-center justify-center" onClick={prevReview}>
                          &lt;
                        </button>
                        <button className="w-6 h-6 rounded-full bg-surface hover:bg-surface-bright text-on-surface text-xs font-bold flex items-center justify-center" onClick={nextReview}>
                          &gt;
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {data.socials.length > 0 && (
              <div className={`grid gap-4 ${data.socials.length >= 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {data.socials.map((s, i) => (
                  <a
                    key={i}
                    className="group p-3 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-between transition-colors"
                    href={s.href}
                    rel="noopener"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface text-xl">{s.icon}</span>
                      <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">{s.label}</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{s.value}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>{data.footerLeft}</span>
          <span className="text-on-surface">{data.footerRight}</span>
        </div>
      </div>
    </section>
  );
}
