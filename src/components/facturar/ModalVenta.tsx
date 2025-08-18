import type { Dispatch, SetStateAction } from "react";
import type { IClienteContado } from "../../interfaces/IClienteContado";
import type { IProducto } from "../../interfaces/IProducto";
import { formatWithSeparator } from "../../utils/formatValue";
import type { IClienteCredito } from "../../interfaces/IClienteCredito";

type Props = {
  id: string;
  datosCliente?: IClienteContado;
  datosCredito?: IClienteCredito;
  subtotal: number;
  iva: number;
  initialCliente?: IClienteContado;
  initialCredito?: IClienteCredito;
  setDatosCliente?: Dispatch<SetStateAction<IClienteContado>>;
  setDatosCredito?: Dispatch<SetStateAction<IClienteCredito>>;
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
  setSubtotal: Dispatch<SetStateAction<number>>;
  setIva: Dispatch<SetStateAction<number>>;
};

const ModalVenta = ({
  id,
  datosCliente,
  datosCredito,
  subtotal,
  iva,
  initialCliente,
  initialCredito,
  setDatosCliente,
  setDatosCredito,
  setProductos,
  setSubtotal,
  setIva,
}: Props) => {
  const reset = () => {
    if (setDatosCliente && initialCliente) setDatosCliente(initialCliente);
    if (setDatosCredito && initialCredito) setDatosCredito(initialCredito);
    setProductos([]);
    setSubtotal(0);
    setIva(0);
  };
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Venta Realizada</h3>
        <hr />
        <div className="modal-body">
          {datosCliente && (
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
          )}
          {datosCredito && (
            <div className="flex flex-col gap-2 my-2 py-2 border-b-1 border-b-black">
              <div className="flex flex-col justify-between">
                <p className="text-xl font-bold">{datosCredito.nombres}</p>
                <p className="text-lg font-bold">
                  Cedula:{" "}
                  <span className="text-md font-normal">
                    {datosCredito.cedula}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Periodos:{" "}
                  <span className="text-md font-normal">
                    {datosCredito.periodos}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Dias de gracia:{" "}
                  <span className="text-md font-normal">
                    {datosCredito.diasGracia}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Numero de cuotas:{" "}
                  <span className="text-md font-normal">
                    {datosCredito.numCuotas}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Valor Cuota:{" "}
                  <span className="font-bold text-red-600">
                    ${formatWithSeparator(datosCredito.valorCuota)}
                  </span>
                </p>
              </div>
            </div>
          )}
          {/* <TableProductos venta={true} /> */}
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
              {datosCliente?.abono && (
                <tr>
                  <td colSpan={3} className="w-[77%] font-black">
                    Abono
                  </td>
                  <td>$ {formatWithSeparator(String(datosCliente.abono))}</td>
                </tr>
              )}
              {datosCliente?.abono && (
                <tr>
                  <td colSpan={3} className="w-[77%] font-black">
                    Resta
                  </td>
                  <td className="font-black">
                    ${" "}
                    {formatWithSeparator(
                      String(
                        iva +
                          subtotal -
                          Number(String(datosCliente.abono).replaceAll(".", ""))
                      )
                    )}
                  </td>
                </tr>
              )}
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
