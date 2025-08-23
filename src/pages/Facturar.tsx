import { useState } from "react";
import GeneralForm from "../components/facturar/GeneralForm";
import type { IProducto } from "../interfaces/IProducto";
import TabContado from "../components/facturar/contado/TabContado";
import TabCredito from "../components/facturar/credito/TabCredito";
import type { Step } from "react-joyride";
import Tour from "../components/resources/Tour";

const Facturar = () => {
  const [productosFacturar, setProductosFacturar] = useState<IProducto[]>([]);
  const [recalculate, setRecalculate] = useState(false);
  const tourSteps: Step[] = [
    {
      content: <h2>Venderemos nuestros productos!</h2>,
      locale: { skip: "Saltar", nextLabelWithProgress: "Siguiente" },
      placement: "center",
      target: "body",
    },
    {
      content: <h2>Selecciona tus productos y las unidades vendidas!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
      },
      placement: "bottom",
      target: "#select_producto",
    },
    {
      content: <h2>Agrega el producto a productos vendidos!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
      },
      placement: "bottom",
      target: "#agrega_producto",
    },
    {
      content: (
        <h2>
          Agregados los productos ahora puedes proceder a realizar tu venta de
          Contado, a credito o por separado!
        </h2>
      ),
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
        last: "OK",
      },
      placement: "bottom",
      target: "#tabs_vender",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Tour tourSteps={tourSteps} path="facturar" />
      <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg border border-gray-300 min-h-32 w-full">
        <GeneralForm
          setRecalculate={setRecalculate}
          productosFacturar={productosFacturar}
          setProductosFacturar={setProductosFacturar}
        />
      </div>
      <div
        className="tabs tabs-box w-full shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg border border-gray-300"
        id="tabs_vender"
      >
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Contado"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <TabContado
            productos={productosFacturar}
            setProductos={setProductosFacturar}
            type="contado"
            recalculate={recalculate}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Credito"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <TabCredito
            productos={productosFacturar}
            setProductos={setProductosFacturar}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Separado"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <TabContado
            productos={productosFacturar}
            setProductos={setProductosFacturar}
            type="separado"
            recalculate={recalculate}
          />
        </div>
      </div>
    </div>
  );
};
export default Facturar;
