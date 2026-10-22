export default function ComingSoonCard({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="relative w-full scroll-mt-28">
      <div className="w-full bg-surface-container-low rounded-[24px] p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]">
        <h3 className="font-headline-lg uppercase text-on-surface font-extrabold tracking-tight text-2xl sm:text-3xl">{title}</h3>
        <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest font-bold">
          Coming Soon
        </span>
      </div>
    </section>
  );
}
