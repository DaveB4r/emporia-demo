import { useState } from "react";
import GeneralForm from "../components/facturar/GeneralForm";
import type { IProducto } from "../interfaces/IProducto";
import TabContado from "../components/facturar/contado/TabContado";
import TabCredito from "../components/facturar/credito/TabCredito";

const Facturar = () => {
  const [productosFacturar, setProductosFacturar] = useState<IProducto[]>([]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg border border-gray-300 min-h-32 w-full">
        <GeneralForm
          productosFacturar={productosFacturar}
          setProductosFacturar={setProductosFacturar}
        />
      </div>
      <div className="tabs tabs-box w-full shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg border border-gray-300">
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
          />
        </div>
      </div>
    </div>
  );
};
export default Facturar;
