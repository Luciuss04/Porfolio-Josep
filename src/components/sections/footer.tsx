import { useI18n } from '@/i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} Josep Pérez Morente. {t.footer.made}
        </p>
        <a href="#top" className="link-sweep inline-flex min-h-11 items-center hover:text-violet-pale">
          {t.footer.top}
        </a>
      </div>
    </footer>
  )
}
