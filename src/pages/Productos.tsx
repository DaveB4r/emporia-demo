import TableProductos from "../components/productos/TableProductos";
import AddProduct from "../components/productos/AddProduct";
import type { Step } from "react-joyride";
import Tour from "../components/resources/Tour";

const Productos = () => {
  const tourSteps: Step[] = [
    {
      content: <h2>Crearemos nuestro primer producto!</h2>,
      locale: { skip: "Saltar", nextLabelWithProgress: "Siguiente" },
      placement: "center",
      target: "body",
    },
    {
      content: <h2>Diligencia todos los campos para crear un producto!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
      },
      placement: "bottom",
      target: "#form_productos",
    },
    {
      content: <h2>Guarda tu producto!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
      },
      placement: "bottom",
      target: "#btn_guardar_producto",
    },
    {
      content: <h2>Verifica tus productos!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
      },
      placement: "bottom",
      target: "#table_productos",
    },
    {
      content: <h2>Ahora puedes vender tus productos, Dirigete a Facturar!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
        last: "OK",
      },
      placement: "bottom",
      target: "#li_facturar",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-[calc(100vw-100px)]">
      <Tour tourSteps={tourSteps} path="productos"/>
      <div className="w-full md:w-[25%] min-h-64">
        <AddProduct />
      </div>
      <div className="w-full md:w-[75%]  min-h-64">
        <TableProductos />
      </div>
    </div>
  );
};

export default Productos;
