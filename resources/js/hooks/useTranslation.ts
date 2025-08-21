import { usePage } from '@inertiajs/react'

interface PageProps {
  translations: Record<string, string>
  locale: string
  [key: string]: any
}

export function useTranslation() {
  const page = usePage<PageProps>()
  const { translations, locale } = page.props

  const t = (key: string, replacements: Record<string, string> = {}): string => {
    let translation = translations[key] || key

    // Replace placeholders
    Object.entries(replacements).forEach(([placeholder, value]) => {
      translation = translation.replace(`:${placeholder}`, value)
    })

    return translation
  }

  return {
    t,
    locale,
    translations,
  }
}
