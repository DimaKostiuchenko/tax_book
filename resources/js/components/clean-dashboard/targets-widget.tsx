export function TargetsWidget() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg flex-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Targets</h3>
      <div className="space-y-6">
        {/* Progress Bar 1 */}
        <div>
          <div className="flex justify-between text-gray-500 text-sm mb-1">
            <span>Views</span>
            <span className="font-semibold text-gray-800">75%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: "75%" }}
            />
          </div>
        </div>
        
        {/* Progress Bar 2 */}
        <div>
          <div className="flex justify-between text-gray-500 text-sm mb-1">
            <span>Followers</span>
            <span className="font-semibold text-gray-800">50%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="bg-yellow-500 h-full rounded-full"
              style={{ width: "50%" }}
            />
          </div>
        </div>
        
        {/* Progress Bar 3 */}
        <div>
          <div className="flex justify-between text-gray-500 text-sm mb-1">
            <span>Income</span>
            <span className="font-semibold text-gray-800">25%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full rounded-full"
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
