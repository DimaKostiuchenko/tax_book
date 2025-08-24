interface WelcomeWidgetProps {
  userName: string
}

export function WelcomeWidget({ userName }: WelcomeWidgetProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="flex-1 pr-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hi {userName}, Welcome back!
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          This page is designed to give some important information about the
          application. Let's make something together!
        </p>
      </div>
      <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mt-4 md:mt-0">
        <img
          src="https://placehold.co/192x192/b3b3e6/333366?text=Welcome"
          alt="Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
