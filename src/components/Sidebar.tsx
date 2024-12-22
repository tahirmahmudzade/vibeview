import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaMusic,
  FaUserFriends,
  FaCogs,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { BiChevronLeft } from "react-icons/bi";
import { logout } from "@/app/actions/auth";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  isDrawerOpen,
  closeDrawer,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaHome className="text-xl" />,
    },
    {
      name: "Tracks",
      href: "/tracks",
      icon: <FaMusic className="text-xl" />,
    },
    {
      name: "Artists",
      href: "/artists",
      icon: <FaUserFriends className="text-xl" />,
    },
  ];

  return (
    <aside
      className={`
        z-50 flex flex-col h-full bg-gradient-to-b from-[#0C1F11] to-[#08150C] text-gray-200 py-6 px-4
        transition-all duration-300 transform
        ${collapsed ? "w-16" : "w-64"}
        ${
          isDrawerOpen
            ? "translate-x-0 fixed top-0 left-0"
            : "translate-x-[-100%] fixed md:static md:translate-x-0"
        }
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-3">
            {/* Profile Image or Placeholder */}
            <div className="w-10 h-10 rounded-full border-2 border-green-600 overflow-hidden flex items-center justify-center bg-black/30">
              {/* If you have user image logic: <img src={userImageUrl || '/placeholder.png'} .../> */}
              {/* For now, just a placeholder icon if no image */}
              <FaUser className="text-gray-300 text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-green-100">Username</span>
              <span className="text-xs text-gray-400">user@example.com</span>
            </div>
          </div>
        )}
        {/* Collapse Button (medium+ screens) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block p-1 rounded hover:bg-black/30 transition-colors"
        >
          <BiChevronLeft
            className={`text-xl text-gray-200 transition-transform duration-300 ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeDrawer}
                  className={`
      flex items-center ${
        collapsed ? "justify-center" : "gap-3"
      } px-3 py-2 rounded-md text-sm font-medium
      transition-colors duration-200
      ${isActive ? "bg-green-700 text-white" : "hover:bg-black/30"} 
    `}
                >
                  <div className="flex-none h-6 w-6 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="mt-8 space-y-2">
        <form action={logout}>
          <button
            type="submit"
            className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white
            bg-red-600 hover:bg-red-700 transition-colors
            ${collapsed ? "justify-center" : ""}
          `}
          >
            <FaSignOutAlt className="text-xl" />
            {!collapsed && "Logout"}
          </button>
        </form>
        <Link
          href="/settings"
          onClick={closeDrawer}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-black/30 transition-colors
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <FaCogs className="text-xl" />
          {!collapsed && "Settings"}
        </Link>
      </div>
    </aside>
  );
}
