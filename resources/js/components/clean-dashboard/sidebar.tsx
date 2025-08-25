import { IconHome } from '@/components/icons/icon-home'
import { IconEvents } from '@/components/icons/icon-events'
import { IconUser } from '@/components/icons/icon-user'

export function Sidebar() {
  return (
    <aside className="w-full lg:w-20 p-4 shadow-sm flex-shrink-0 flex flex-col justify-between" style={{
      background: 'white'
    }}>
      <div>
                {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            className="w-12 h-12"
            alt="Logo"
            src="/flogo.png"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <a
            href="#"
            className="flex items-center justify-center p-3 rounded-md bg-gray-50 text-gray-800 font-semibold w-12
            h-12"
            title="Home"
          >
            <IconHome/>
          </a>

          <a
            href="#"
            className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-200 w-12 h-12"
            title="Tax Events"
          >
            <IconEvents/>
          </a>
        </nav>
      </div>

      {/* User profile section */}
      <div className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-200 cursor-pointer w-12 h-12" title="User Profile">
        <IconUser/>
      </div>
    </aside>
  )
}
