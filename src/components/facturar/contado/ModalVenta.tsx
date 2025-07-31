import type { Dispatch, SetStateAction } from "react";
import type { IClienteContado } from "../../../interfaces/IClienteContado";
import type { IProducto } from "../../../interfaces/IProducto";
import { formatWithSeparator } from "../../../utils/formatValue";
import TableProductos from "../TableProductos";

type Props = {
  productos: IProducto[];
  datosCliente: IClienteContado;
  subtotal: number;
  iva: number;
  initialCliente: IClienteContado;
  setDatosCliente: Dispatch<SetStateAction<IClienteContado>>;
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
  setSubtotal: Dispatch<SetStateAction<number>>;
  setIva: Dispatch<SetStateAction<number>>;
};

const ModalVenta = ({
  productos,
  datosCliente,
  subtotal,
  iva,
  initialCliente,
  setDatosCliente,
  setProductos,
  setSubtotal,
  setIva,
}: Props) => {
  const reset = () => {
    setDatosCliente(initialCliente);
    setProductos([]);
    setSubtotal(0);
    setIva(0);
  };
  return (
    <dialog id="modal_venta" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Venta Realizada</h3>
        <hr />
        <div className="modal-body">
          <div className="flex flex-col gap-2 my-2 py-2 border-b-1 border-b-black">
            <div className="flex justify-between">
              <p>
                {datosCliente.nombre} {datosCliente.apellido}
              </p>
              <p>{datosCliente.celular}</p>
            </div>
            <p>
              {datosCliente.cedula}-{datosCliente.verificacion}
            </p>
            <p>{datosCliente.correo}</p>
          </div>
          <TableProductos productos={productos} venta={true} />
          <table className="table table-zebra">
            <tbody>
              <tr>
                <td colSpan={3} className="w-[77%] font-black">
                  Subtotal
                </td>
                <td>$ {formatWithSeparator(String(subtotal))}</td>
              </tr>
              <tr>
                <td colSpan={3} className="w-[77%] font-black">
                  Iva
                </td>
                <td>$ {formatWithSeparator(String(iva))}</td>
              </tr>
              <tr>
                <td colSpan={3} className="w-[77%] font-black">
                  Total
                </td>
                <td className="font-black">
                  $ {formatWithSeparator(String(iva + subtotal))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={reset}>
              Finalizar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalVenta;
