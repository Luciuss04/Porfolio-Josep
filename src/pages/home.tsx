import { Hero } from '@/components/sections/hero'
import { Featured } from '@/components/sections/featured'
import { Skills } from '@/components/sections/skills'
import { PAGES } from '@/data/site'
import { useI18n } from '@/i18n'
import { useMeta } from '@/lib/utils'

export function Home() {
  const { lang } = useI18n()
  useMeta(PAGES.home.title[lang], PAGES.home.description[lang])

  return (
    <>
      <Hero />
      <Featured />
      <Skills />
    </>
  )
}
