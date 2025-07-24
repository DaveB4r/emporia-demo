import { Outlet } from "react-router-dom";
import Navbar from "../components/includes/Navbar";
import Sidebar from "../components/includes/Sidebar";
import Footer from "../components/includes/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen font-sans antialiased">
      <Sidebar />
      <div className="flex flex-col flex-1">
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
