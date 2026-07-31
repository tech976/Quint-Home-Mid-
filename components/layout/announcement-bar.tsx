export function AnnouncementBar() {
  return (
    <div
      data-site-chrome
      className="border-b border-[color:var(--color-verdant)] bg-[color:var(--color-verdant)] text-[color:var(--color-ivory)]"
    >
      <div className="mx-auto flex max-w-[var(--container-full)] items-center justify-center gap-6 px-6 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] md:px-10">
        <span className="text-center">
          Complimentary shipping on orders above ₹5000
        </span>
      </div>
    </div>
  );
}
