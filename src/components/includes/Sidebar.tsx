import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-6 space-y-4">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>
        <Link to="/contact" className="hover:text-gray-300">
          Contact
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
