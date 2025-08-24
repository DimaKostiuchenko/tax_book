export function ViewsChartWidget() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg flex-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Views</h3>
      <div className="text-3xl font-bold text-gray-900 mb-2">6,967,431</div>
      <canvas id="viewsChart" className="w-full h-40" />
      <div className="mt-4 flex justify-between items-center text-gray-500">
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-500 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>View Dashboard</span>
        </a>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}
