import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/app-language-switcher'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestLocalization() {
  const { t, locale } = useTranslation()

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Localization Test</h1>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Current Locale */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Locale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <strong>Locale:</strong> {locale}
            </p>
          </CardContent>
        </Card>

        {/* Translation Examples */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Dashboard:</strong> {t('dashboard')}</p>
              <p><strong>Events:</strong> {t('events')}</p>
              <p><strong>Settings:</strong> {t('settings')}</p>
              <p><strong>Profile:</strong> {t('profile')}</p>
              <p><strong>Logout:</strong> {t('logout')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Save:</strong> {t('save')}</p>
              <p><strong>Cancel:</strong> {t('cancel')}</p>
              <p><strong>Edit:</strong> {t('edit')}</p>
              <p><strong>Delete:</strong> {t('delete')}</p>
              <p><strong>Create:</strong> {t('create')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Pending:</strong> {t('pending')}</p>
              <p><strong>Completed:</strong> {t('completed')}</p>
              <p><strong>Overdue:</strong> {t('overdue')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Payment:</strong> {t('payment')}</p>
              <p><strong>Report:</strong> {t('report')}</p>
              <p><strong>Payment Event:</strong> {t('payment_event')}</p>
              <p><strong>Report Event:</strong> {t('report_event')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Dashboard:</strong> {t('tax_events_dashboard')}</p>
              <p><strong>Upcoming Events:</strong> {t('upcoming_events')}</p>
              <p><strong>Event Details:</strong> {t('event_details')}</p>
              <p><strong>Description:</strong> {t('event_description')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Pay Now:</strong> {t('pay_now')}</p>
              <p><strong>Submit Report:</strong> {t('submit_report')}</p>
              <p><strong>View Details:</strong> {t('view_details')}</p>
            </CardContent>
          </Card>
        </div>

        {/* URL Parameters */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Test Language Switching</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Use the language switcher in the top right or these links:</p>
            <div className="flex gap-4">
              <a 
                href="?locale=en" 
                className="text-blue-600 hover:underline"
              >
                Switch to English
              </a>
              <a 
                href="?locale=uk" 
                className="text-blue-600 hover:underline"
              >
                Переключитися на українську
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
