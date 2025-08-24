import { IconHome } from '@/components/icons/icon-home'
import { IconEvents } from '@/components/icons/icon-events'
import { IconUser } from '@/components/icons/icon-user'

export function Sidebar() {
  return (
    <aside className="w-full lg:w-64 bg-white p-6 rounded-3xl shadow-lg flex-shrink-0 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-10">
          <img
            className="photo"
            alt="Venge"
            width={48}
            height={48}
            src="https://cdn.dribbble.com/users/6538082/avatars/normal/4a1b2be2898cd3e34eaf3e70523ffda1.png?1642946293"
          />
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-xl bg-blue-100 text-gray-800 font-semibold"
          >
            <IconHome/>
            <span>Home</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-200"
          >
            <IconEvents/>
            <span>Calendar</span>
          </a>
        </nav>
      </div>
      
      {/* User profile section */}
      <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-200 cursor-pointer">
        <IconUser/>
        <span>User</span>
      </div>
    </aside>
  )
}
