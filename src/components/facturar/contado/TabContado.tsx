import { useEffect, useState } from "react";
import type { IProducto } from "../../../interfaces/IProducto";
import DatosCliente from "./DatosCliente";
import { formatWithSeparator } from "../../../utils/formatValue";

type Props = {
  productos: IProducto[];
};

const TabContado = ({ productos }: Props) => {
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);

  useEffect(() => {
    if (productos.length > 0) {
      let subTotal = 0;
      productos.map((producto) => {
        subTotal +=
          Number(String(producto.precio).replaceAll(".", "")) *
          producto.unidades;
      });
      setIva(subTotal * 0.19);
      setSubtotal(subTotal);
    }
  }, [productos]);

  return (
    <div className="flex flex-col w-full bg-base-200 py-4">
      <DatosCliente />
      <div className="flex flex-col w-full gap-3">
        <div className="w-full border-b-2">
          <h3 className="py-4 uppercase text-center font-bold text-2xl">
            resumen compra
          </h3>
        </div>
        <p className="text-black text-center">
          <span className="text-xl uppercase font-bold">subtotal:</span>
          {" $"}
          {formatWithSeparator(String(subtotal))}
        </p>
        <p className="text-black text-center">
          <span className="text-xl uppercase font-bold">iva:</span>
          {" $"}
          {formatWithSeparator(String(iva))}
        </p>
        <p className="text-center text-red-600 font-bold">
          <span className="text-2xl uppercase font-black">total:</span>
          {" $"}
          {formatWithSeparator(String(subtotal + iva))}
        </p>
        <button className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          Finalizar venta
        </button>
      </div>
    </div>
  );
};

export default TabContado;
