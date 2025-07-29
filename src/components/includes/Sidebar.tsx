import { ReceiptText, Shapes, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 border-none bg-zinc-700 text-white h-full py-6 space-y-4">
      <nav className="flex flex-col space-y-4">
        <ul className="space-y-4 w-full">
          <li className="p-2">
            <Link to="/" className="hover:text-zinc-300">
              <img
                src="/images/logo-white.png"
                alt="logo"
                width={200}
                height={100}
              />
            </Link>
          </li>
          <li
            className={`${
              location.pathname === "/facturar" && "bg-zinc-800"
            } hover:bg-zinc-800`}
          >
            <Link
              to="/facturar"
              className="flex gap-2 text-xl hover:text-zinc-300 items-center py-1"
            >
              {location.pathname === "/facturar" && <span className="bg-sky-400 h-8 w-2" />}
              <ReceiptText /> Facturar
            </Link>
          </li>
          <li className={`${
              location.pathname === "/productos" && "bg-zinc-800"
            } hover:bg-zinc-800`}>
            <Link
              to="/productos"
              className="flex gap-2 text-xl hover:text-zinc-300 items-center py-1"
            >
              {location.pathname === "/productos" && <span className="bg-sky-400 h-8 w-2 rounded-sm" />}
              <ShoppingCart /> Productos
            </Link>
          </li>
          <li className={`${
              location.pathname === "/inventario" && "bg-zinc-800"
            } hover:bg-zinc-800`}>
            <Link
              to="/inventario"
              className="flex gap-2 text-xl hover:text-zinc-300 items-center py-1"
            >
              {location.pathname === "/inventario" && <span className="bg-sky-400 h-8 w-2 rounded-sm" />}
              <Shapes /> Inventario
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
