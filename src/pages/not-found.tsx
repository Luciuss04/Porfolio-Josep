import { RouteButton } from '@/components/ui/button'
import { SITE_NAME } from '@/data/site'
import { useI18n } from '@/i18n'
import { useMeta } from '@/lib/utils'

export function NotFound() {
  const { t, to } = useI18n()
  useMeta(`${t.notFound.title} · ${SITE_NAME}`, t.notFound.text)

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-40 sm:px-8 sm:pt-48">
      <h1 className="font-display text-5xl leading-tight text-marble sm:text-6xl">{t.notFound.title}</h1>
      <p className="mt-4 max-w-xl text-lg text-mist">{t.notFound.text}</p>
      <RouteButton to={to('/')} className="mt-8">
        {t.notFound.home}
      </RouteButton>
    </div>
  )
}
