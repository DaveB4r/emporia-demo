import {
  ArrowLeftRight,
  Bot,
  CircleDollarSign,
  Menu,
  ReceiptText,
  ShoppingCart,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex-shrink-0 bg-zinc-700 text-white shadow-lg transition-all duration-300 ease-in-out flex flex-col translate-x-0 ${
        isSidebarOpen ? "w-68" : "w-20"
      } md:w-68`}
    >
      <div
        className={`flex items-center p-4 h-16 ${
          isSidebarOpen ? "justify-start" : "justify-center"
        } md:justify-start`}
      >
        {isSidebarOpen && (
          <Link to="/" className="hover:text-zinc-300">
            <img
              src="/images/white-logo.webp"
              alt="logo"
              className="w-28 md:w-48"
              width={100}
              height={100}
            />
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="md:hidden ml-auto text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
          aria-label={isSidebarOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          <li
            id="li_facturar"
            className={`rounded-xl hover:bg-zinc-800 hover:shadow-md transition-all duration-200 ease-in-out group ${
              isSidebarOpen ? "justify-start" : "justify-center"
            } ${location.pathname === "/facturar" && "bg-zinc-800"}`}
          >
            <Link
              to="/facturar"
              className="flex items-center px-4 py-3 text-lg gap-1"
            >
              {location.pathname === "/facturar" && (
                <span className="bg-sky-400 h-8 w-2 rounded-sm" />
              )}
              <ReceiptText
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Facturar
              </span>
              <span className="sr-only">Facturar</span>
            </Link>
          </li>
          <li
            id="li_productos"
            className={`rounded-xl hover:bg-zinc-800 hover:shadow-md transition-all duration-200 ease-in-out group ${
              isSidebarOpen ? "justify-start" : "justify-center"
            } ${location.pathname === "/productos" && "bg-zinc-800"}`}
          >
            <Link
              to="/productos"
              className="flex items-center px-4 py-3 text-lg gap-1"
            >
              {location.pathname === "/productos" && (
                <span className="bg-sky-400 h-8 w-2 rounded-sm" />
              )}
              <ShoppingCart
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Productos
              </span>
              <span className="sr-only">Productos</span>
            </Link>
          </li>
          <div className="indicator flex flex-col gap-2 border border-gray-950 mt-4 rounded-2xl">
            <span className="indicator-item badge badge-info text-white font-semibold">
              Proximamente
            </span>
            <li
              className={`w-full mt-4 indicator flex items-center px-4 py-3 text-lg gap-1 rounded-xl transition-all duration-200 ease-in-out group opacity-70  ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <CircleDollarSign
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Abonos
              </span>
            </li>
            <li
              className={`w-full mt-4 indicator flex items-center px-4 py-3 text-lg gap-1 rounded-xl transition-all duration-200 ease-in-out group opacity-70  ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Users
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Crear Cliente
              </span>
            </li>
            <li
              className={`w-full mt-4 indicator flex items-center px-4 py-3 text-lg gap-1 rounded-xl transition-all duration-200 ease-in-out group opacity-70  ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Wallet
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Cartera
              </span>
            </li>
            <li
              className={`w-full mt-4 indicator flex items-center px-4 py-3 text-lg gap-1 rounded-xl transition-all duration-200 ease-in-out group opacity-70  ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Bot
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Automatizacion
              </span>
            </li>
            <li
              className={`w-full mt-4 indicator flex items-center px-4 py-3 text-lg gap-1 rounded-xl transition-all duration-200 ease-in-out group opacity-70  ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <ArrowLeftRight
                size={isSidebarOpen ? 24 : 32}
                className={`mr-0 ${
                  isSidebarOpen ? "md:mr-3" : "md:mr-0"
                } transition-all duration-200`}
              />
              <span
                className={`transition-all duration-200 ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                } md:opacity-100 md:w-auto`}
              >
                Traslados
              </span>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
