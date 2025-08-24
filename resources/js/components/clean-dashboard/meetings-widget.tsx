export function MeetingsWidget() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Meetings</h3>
      <div className="space-y-4">
        {/* Meeting Item 1 */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
          <img
            src="https://placehold.co/48x48/d1e5f8/3a8ee2?text=EA"
            className="w-12 h-12 rounded-full flex-shrink-0"
            alt="Emmy Anderson"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Emmy Anderson</h4>
            <p className="text-sm text-gray-500">8:00 - 10:00</p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        
        {/* Meeting Item 2 */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
          <img
            src="https://placehold.co/48x48/fde1da/e95325?text=JG"
            className="w-12 h-12 rounded-full flex-shrink-0"
            alt="Joy McGlynn"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Joy McGlynn</h4>
            <p className="text-sm text-gray-500">11:00 - 12:00</p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        
        {/* Meeting Item 3 */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
          <img
            src="https://placehold.co/48x48/c5e9d9/26b97f?text=MD"
            className="w-12 h-12 rounded-full flex-shrink-0"
            alt="Mara Dach"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Mara Dach</h4>
            <p className="text-sm text-gray-500">14:00 - 15:00</p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        
        {/* Add New Meeting Button */}
        <div className="flex items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
