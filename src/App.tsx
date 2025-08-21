import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Facturar from "./pages/Facturar";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="facturar" element={<Facturar />} />
          <Route path="productos" element={<Productos />} />\
        </Route>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
