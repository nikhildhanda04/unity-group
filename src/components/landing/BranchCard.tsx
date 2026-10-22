"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type Review = { quote: string; author: string };

export type Social = { icon: string; label: string; value: string; href: string };

export type QuickAction = { icon: string; label: string; href: string };

export type BranchCardData = {
  index: string; // "01"
  anchorId: string; // "unity-motor"
  eyebrowEn: string;
  eyebrowHi: string;
  title: string;
  locTag: string;
  mapsUrl: string;
  statusTag: string;
  bayIdValue: string;
  subtitleEn: string;
  subtitleHi: string;
  liveTagText: string;
  roomTagText: string;
  image: { src: string; alt: string };
  imageTags: Array<{ text: string; accent?: boolean }>;
  isoFigure?: ReactNode;
  description: string;
  actions?: QuickAction[];
  cta: { titleEn: string; sub: string; tagText: string; onClick?: () => void; href?: string };
  rating: string;
  reviewCountLabel: string;
  reviewLink: string;
  reviews: Review[];
  socials: Social[];
  footerLeft: string;
  footerRight: string;
};

export default function BranchCard({ data, id = data.anchorId }: { data: BranchCardData; id?: string }) {
  const [reviewIdx, setReviewIdx] = useState(0);
  const reviews = data.reviews;

  function prevReview() {
    setReviewIdx((i) => (i - 1 + reviews.length) % reviews.length);
  }

  function nextReview() {
    setReviewIdx((i) => (i + 1) % reviews.length);
  }

  return (
    <section id={id} className="relative w-full px-margin-mobile lg:px-margin bg-surface-container-lowest scroll-mt-28">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-primary-container font-label-sm text-label-sm uppercase tracking-widest font-black">
            <span className="w-3 h-3 bg-primary-container self-center shrink-0"></span>
            <span style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 4vw, 1.35rem)", lineHeight: 1.1, letterSpacing: "0.04em" }}>
              {data.eyebrowEn}
            </span>
            <span className="text-[10px] normal-case tracking-normal text-on-surface-variant/60 font-sans">{data.eyebrowHi}</span>
          </div>
          <h2
            className="font-headline-lg uppercase text-on-surface mt-1.5"
            style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, letterSpacing: "0.02em", lineHeight: 0.95, fontSize: "clamp(2.25rem, 9vw, 4rem)" }}
          >
            {data.title}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary-container transition-colors group"
            href={data.mapsUrl}
            rel="noopener"
            target="_blank"
            title="Open in Google Maps"
          >
            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">location_on</span>
            {data.locTag}
          </a>
          <span className="px-2.5 py-1 bg-surface-container-highest text-primary font-label-sm text-label-sm font-bold">
            {data.statusTag}
          </span>
        </div>
      </div>

      <div className="w-full bg-surface-container border-2 border-surface-container-highest shadow-[8px_8px_0px_#ff544b] relative overflow-hidden">
        <div className="w-full bg-surface-container-high px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-surface-container-highest flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="px-2 py-0.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-black shrink-0">
              {data.bayIdValue}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span
                className="text-on-surface uppercase tracking-wider font-bold"
                style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)", lineHeight: 1.1 }}
              >
                {data.subtitleEn}
              </span>
              <span className="text-[10px] normal-case tracking-normal text-on-surface-variant/60 font-sans">{data.subtitleHi}</span>
            </span>
          </div>
          <div className="flex items-center gap-4 font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span> {data.liveTagText}
            </span>
            <span className="hidden sm:inline">{data.roomTagText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          <div className="lg:col-span-7 p-5 sm:p-10 relative bg-surface border-b-2 lg:border-b-0 lg:border-r-2 border-surface-container-highest">
            <a
              href={data.mapsUrl}
              rel="noopener"
              target="_blank"
              title="Open in Google Maps"
              className="relative block w-full h-full min-h-[440px] overflow-hidden border border-surface-container-highest group"
            >
              {data.image.src ? (
                <Image
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
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
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90"></div>
              {data.isoFigure && (
                <div className="hidden md:block absolute bottom-4 left-4 w-32 opacity-80 pointer-events-none select-none">
                  {data.isoFigure}
                </div>
              )}
              <div className="absolute top-4 left-4 right-4 flex flex-col items-start gap-1.5">
                {data.imageTags.map((tag, i) => (
                  <span
                    key={i}
                    className={
                      tag.accent
                        ? "max-w-full px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-black"
                        : "max-w-full px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold border border-surface-container-highest"
                    }
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold border border-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-base">location_on</span>
                VIEW ON MAP
              </div>
            </a>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-10 flex flex-col justify-center bg-surface-container">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest mb-6">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-black">
                [ DIRECT ACCESS CONSOLE ]
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">ONLINE 24/7</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">{data.description}</p>

            <div className="space-y-5">
              {data.actions && data.actions.length > 0 && (
                <div className={`grid gap-3 ${data.actions.length >= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {data.actions.map((action, i) => (
                    <a
                      key={i}
                      href={action.href}
                      rel="noopener"
                      target="_blank"
                      className="group p-3 bg-surface border-2 border-surface-container-highest hover:border-primary-container shadow-[3px_3px_0px_var(--ink)] hover:shadow-[3px_3px_0px_#ff544b] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1.5 text-center py-4"
                    >
                      <span className="material-symbols-outlined text-primary-container text-xl group-hover:scale-110 transition-transform">
                        {action.icon}
                      </span>
                      <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface">{action.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {(() => {
                const CtaInner = (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined text-2xl shrink-0 group-hover:rotate-12 transition-transform">calendar_month</span>
                      <div className="min-w-0">
                        <div
                          className="font-headline-sm font-black uppercase tracking-tight"
                          style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, letterSpacing: "0.04em", fontSize: "clamp(1.4rem, 6vw, 2rem)", lineHeight: 1.05 }}
                        >
                          {data.cta.titleEn}
                        </div>
                        <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container/80">{data.cta.sub}</div>
                      </div>
                    </div>
                    <span className="shrink-0 font-label-md text-label-md uppercase font-black bg-on-primary-container text-primary-container px-3 py-1">
                      {data.cta.tagText}
                    </span>
                  </>
                );
                const ctaClass =
                  "w-full p-4 sm:p-5 bg-primary-container text-on-primary-container border-2 border-on-surface shadow-[4px_4px_0px_var(--ink)] hover:shadow-[4px_4px_0px_#ff544b] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left group";
                return data.cta.onClick ? (
                  <button className={ctaClass} type="button" onClick={data.cta.onClick}>
                    {CtaInner}
                  </button>
                ) : (
                  <a className={ctaClass} href={data.cta.href ?? "#"} rel="noopener" target="_blank">
                    {CtaInner}
                  </a>
                );
              })()}

              <div className="bg-surface p-5 border-2 border-surface-container-highest flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-yellow-400 text-black font-label-sm text-label-sm font-black">{data.rating}</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">{data.reviewCountLabel}</span>
                  </div>
                  <a
                    className="text-primary hover:underline font-label-sm text-label-sm uppercase font-bold flex items-center gap-1"
                    href={data.reviewLink}
                    rel="noopener"
                    target="_blank"
                  >
                    WRITE REVIEW <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
                <div className="bg-surface-container-high p-4 border-l-4 border-primary-container transition-all duration-300">
                  <p className="font-body-sm text-body-sm text-on-surface italic">{reviews[reviewIdx].quote}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-container-highest">
                    <span className="font-label-sm text-label-sm text-primary-container uppercase font-bold">
                      {reviews[reviewIdx].author}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="px-1.5 py-0.5 bg-surface hover:bg-surface-bright text-on-surface text-xs font-bold font-mono" onClick={prevReview}>
                        &lt;
                      </button>
                      <button className="px-1.5 py-0.5 bg-surface hover:bg-surface-bright text-on-surface text-xs font-bold font-mono" onClick={nextReview}>
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {data.socials.length > 0 && (
                <div className={`grid gap-4 ${data.socials.length >= 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {data.socials.map((s, i) => (
                    <a
                      key={i}
                      className="group p-3 bg-surface border border-surface-container-highest hover:border-primary flex items-center justify-between transition-colors"
                      href={s.href}
                      rel="noopener"
                      target="_blank"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
                        <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold group-hover:text-primary">{s.label}</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">{s.value}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 pb-5 px-6 border-t border-surface-container-highest flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>{data.footerLeft}</span>
          <span className="font-mono text-primary">{data.footerRight}</span>
        </div>
      </div>
    </section>
  );
}
