import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/button'
import { DiscordIcon, GithubIcon, MastodonIcon, XIcon } from '@/components/icons'
import { useI18n } from '@/i18n'

const EMAIL = 'luciuss4@proton.me'

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/Luciuss04', Icon: GithubIcon },
  { name: 'Discord', href: 'https://discord.com/users/443479189597716480', Icon: DiscordIcon },
  { name: 'X', href: 'https://x.com/luciuss04', Icon: XIcon },
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
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(214,169,64,.12),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <h2 id="contact" className="max-w-3xl font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05] text-marble">
          {t.contact.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-mist">{t.contact.sub}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <LinkButton href={`mailto:${EMAIL}`} className="px-6 py-3 text-base">
            <Mail className="size-[18px]" />
            {EMAIL}
          </LinkButton>
          <Button variant="outline" onClick={copy} className="px-5 py-3 text-base" aria-live="polite">
            {copied ? <Check className="size-[18px] text-gold-pale" /> : <Copy className="size-[18px]" />}
            {copied ? t.contact.copied : t.contact.copy}
          </Button>
        </div>

        <div className="mt-14">
          <p className="text-sm text-mist">{t.contact.elsewhere}</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {SOCIALS.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener me"
                  className="inline-flex items-center gap-2.5 text-marble/90 transition-colors hover:text-gold-pale"
                >
                  <Icon className="size-5" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
