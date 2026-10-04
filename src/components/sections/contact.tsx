import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/button'
import { Stagger, StaggerItem } from '@/components/layout/reveal'
import { DiscordIcon, GithubIcon, MastodonIcon } from '@/components/icons'
import { EMAIL, GITHUB_URL } from '@/data/site'
import { useI18n } from '@/i18n'

const SOCIALS = [
  { name: 'GitHub', href: GITHUB_URL, Icon: GithubIcon },
  { name: 'Discord', href: 'https://discord.com/users/443479189597716480', Icon: DiscordIcon },
  { name: 'Mastodon', href: 'https://mastodon.social/@Luciuss4', Icon: MastodonIcon },
]

export function Contact() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section aria-labelledby="contact" className="relative overflow-hidden border-t border-line/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-violet)_18%,transparent),transparent_60%)]"
      />
      <Stagger className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <StaggerItem>
          <h2 id="contact" className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-marble">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-mist">{t.contact.sub}</p>
        </StaggerItem>

        <StaggerItem className="mt-10 flex flex-wrap items-center gap-3">
          <LinkButton href={`mailto:${EMAIL}`} className="px-6 py-3 text-base">
            <Mail className="size-[18px]" aria-hidden="true" />
            {EMAIL}
          </LinkButton>
          <Button variant="outline" onClick={copy} className="px-5 py-3 text-base" aria-live="polite">
            {copied ? <Check className="size-[18px] text-gold-pale" aria-hidden="true" /> : <Copy className="size-[18px]" aria-hidden="true" />}
            {copied ? t.contact.copied : t.contact.copy}
          </Button>
        </StaggerItem>

        <StaggerItem className="mt-14">
          <p className="label text-mist">{t.contact.elsewhere}</p>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-1">
            {SOCIALS.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener me"
                  className="group/social inline-flex min-h-11 items-center gap-2.5 text-marble/90 transition-colors duration-300 hover:text-violet-pale focus-visible:text-violet-pale"
                >
                  <Icon className="icon-nudge-gh size-5" />
                  <span className="link-sweep pb-0.5">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>
    </section>
  )
}
