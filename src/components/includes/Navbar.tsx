import { LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setTimeout(() => navigate("/login"), 1500);
  };
  return (
    <header className="border-none bg-gradient-to-r from-slate-100 to-gray-200 text-white px-6 py-4 shadow-md">
      <button
        className="btn float-end bg-red-700 text-white rounded-full"
        onClick={logout}
      >
        <LogOut />
        Cerrar sesion
      </button>
    </header>
  );
};

export default Navbar;
