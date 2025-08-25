import { formatWithSeparator } from "../../utils/formatValue";

type Props = {
  subtotal: number;
  iva: number;
};

const ResumenVenta = ({ subtotal, iva }: Props) => {
  return (
    <div className="flex flex-col w-full gap-3 mb-4">
      <div className="w-full border-b-2">
        <h3 className="py-4 uppercase text-center font-bold text-lg md:text-2xl">
          resumen compra
        </h3>
      </div>
      <p className="text-black text-center">
        <span className="text-md md:text-xl uppercase font-bold">subtotal:</span>
        {" $"}
        {formatWithSeparator(String(subtotal))}
      </p>
      <p className="text-black text-center">
        <span className="text-md md:text-xl uppercase font-bold">iva:</span>
        {" $"}
        {formatWithSeparator(String(iva))}
      </p>
      <p className="text-center text-red-600 font-bold">
        <span className="text-md md:text-2xl uppercase font-black">total:</span>
        {" $"}
        {formatWithSeparator(String(subtotal + iva))}
      </p>
    </div>
  );
};

export default ResumenVenta;
