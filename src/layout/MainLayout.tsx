import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/includes/Navbar";
import Sidebar from "../components/includes/Sidebar";
import Footer from "../components/includes/Footer";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

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
      <div className="flex flex-col flex-1 ml-20 md:ml-64">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
