interface CongratulationsWidgetProps {
  userName: string
}

export function CongratulationsWidget({ userName }: CongratulationsWidgetProps) {
  return (
    <div className="bg-blue-600 p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
      <svg
        className="w-16 h-16 text-yellow-300 mb-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M11.332 5.568a1 1 0 011.336-.095l4 3a1 1 0 01.095 1.336L12.7 13.916a1 1 0 01-1.336.095l-4-3a1 1 0 01-.095-1.336l4-3z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M9.332 9.568a1 1 0 011.336-.095l4 3a1 1 0 01.095 1.336L10.7 17.916a1 1 0 01-1.336.095l-4-3a1 1 0 01-.095-1.336l4-3z"
          clipRule="evenodd"
        />
      </svg>
      <h3 className="text-xl font-bold text-white mb-2">
        Congratulations {userName}
      </h3>
      <p className="text-sm text-blue-200 mb-6">
        You have completed 75% of your profile. Your current progress is
        great.
      </p>
      <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-200">
        View Profile
      </button>
    </div>
  )
}
