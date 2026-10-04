export function SectionHead({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 id={id} className="font-display text-4xl leading-tight text-marble sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-mist">{sub}</p>}
    </div>
  )
}
