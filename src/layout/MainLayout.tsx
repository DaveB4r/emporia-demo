import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/includes/Navbar";
import Sidebar from "../components/includes/Sidebar";
import Footer from "../components/includes/Footer";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { CircleQuestionMark } from "lucide-react";

const MainLayout = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.userId) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen font-sans antialiased">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-19 md:ml-64 relative">
        <Navbar />
        <main className="flex-1 overflow-auto p-3 md:p-6">
          <Outlet />
        </main>
        <div className="absolute bottom-5 right-5">
          <Link to="/usuarios">
            <CircleQuestionMark className="cursor-pointer hover:scale-105" />
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
