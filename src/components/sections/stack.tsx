import { useI18n } from '@/i18n'
import { SectionHead } from './section-head'

export function Stack() {
  const { t } = useI18n()
  const groups = [
    { name: t.stack.mobile, items: ['Flutter', 'Dart', 'React Native', 'Xamarin', 'C#'] },
    { name: t.stack.web, items: ['JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'Sass', 'Tailwind CSS'] },
    { name: t.stack.backend, items: ['Python', 'Node.js', 'Express', 'MongoDB', 'discord.py'] },
    { name: t.stack.tools, items: ['Git', 'GitHub', 'Docker', 'VS Code'] },
  ]

  return (
    <section aria-labelledby="stack" className="border-y border-line/60 bg-navy/25">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHead id="stack" title={t.stack.title} sub={t.stack.sub} />
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="border-b border-gold/40 pb-3 font-display text-2xl text-gold-pale">{g.name}</h3>
              <ul className="mt-4 space-y-2.5 text-marble/90">
                {g.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
