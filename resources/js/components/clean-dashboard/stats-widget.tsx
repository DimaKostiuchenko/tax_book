export function StatsWidget() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col space-y-4">
      {/* Card 1 - Likes */}
      <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-500 flex-shrink-0">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">26,789</h3>
          <p className="text-sm text-gray-500">Likes</p>
        </div>
        <div className="text-green-500 text-sm font-semibold">+5%</div>
      </div>
      
      {/* Card 2 - Love */}
      <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 text-red-500 flex-shrink-0">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">6,754</h3>
          <p className="text-sm text-gray-500">Love</p>
        </div>
        <div className="text-green-500 text-sm font-semibold">+10%</div>
      </div>
      
      {/* Card 3 - Smiles */}
      <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 flex-shrink-0">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">52,789</h3>
          <p className="text-sm text-gray-500">Smiles</p>
        </div>
        <div className="text-red-500 text-sm font-semibold">-2%</div>
      </div>
    </div>
  )
}
