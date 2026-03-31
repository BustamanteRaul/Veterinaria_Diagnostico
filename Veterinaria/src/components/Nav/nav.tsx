import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6">
      <ul className="flex items-center h-13 gap-1 list-none">
        {[
          { to: "/", label: "Home", end: true },
          { to: "/owners", label: "Owners" },
          { to: "/pets", label: "Pets" },
          { to: "/visits", label: "Visits" },
          { to: "/bills", label: "Bills" },
        ].map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}