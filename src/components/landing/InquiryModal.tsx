"use client";

import { useState } from "react";

export type InquiryModalConfig = {
  eyebrow: string;
  title: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  serviceLabel: string;
  serviceOptions: string[];
  slots: string[];
  etaLabel: string;
  submitLabel: string;
  confirmationText: string;
};

export default function InquiryModal({ config, onClose }: { config: InquiryModalConfig | null; onClose: () => void }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!config) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(config!.confirmationText);
    setSelectedSlot(null);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-surface border-4 border-on-surface shadow-[8px_8px_0px_#ff544b] p-8 relative">
        <div className="flex items-center justify-between border-b-2 border-surface-container-highest pb-5 mb-7">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-primary-container font-black">{config.eyebrow}</span>
            <h3
              className="font-headline-sm text-headline-sm uppercase text-on-surface"
              style={{ fontFamily: "Teko, sans-serif", fontWeight: 700, letterSpacing: "0.03em", fontSize: "2.25rem", lineHeight: 1 }}
            >
              {config.title}
            </h3>
          </div>
          <button
            className="w-9 h-9 bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-bold flex items-center justify-center border border-on-surface transition-colors"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1.5">{config.fieldLabel}</label>
            <input
              className="w-full px-3 py-2.5 bg-surface-container border-2 border-surface-container-highest focus:border-primary-container text-on-surface font-body-md outline-none"
              placeholder={config.fieldPlaceholder}
              required
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1.5">{config.serviceLabel}</label>
              <select className="w-full px-3 py-2.5 bg-surface-container border-2 border-surface-container-highest focus:border-primary-container text-on-surface font-label-sm text-label-sm outline-none">
                {config.serviceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1.5">PREFERRED DATE</label>
              <input
                className="w-full px-3 py-2 bg-surface-container border-2 border-surface-container-highest focus:border-primary-container text-on-surface font-body-md outline-none"
                required
                type="date"
              />
            </div>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1.5">SELECT TIME SLOT</label>
            <div className="grid grid-cols-3 gap-2">
              {config.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`py-2 border font-label-sm text-label-sm hover:border-primary-container transition-colors ${
                    selectedSlot === slot
                      ? "bg-primary-container text-on-primary-container font-bold border-primary-container"
                      : "bg-surface-container-high border-surface-container-highest text-on-surface"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-5 border-t border-surface-container-highest flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">{config.etaLabel}</span>
            <button
              className="px-6 py-2.5 bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-black border border-on-surface shadow-[3px_3px_0px_var(--ink)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              type="submit"
            >
              {config.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
