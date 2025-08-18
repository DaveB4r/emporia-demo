import { X } from "lucide-react";
import type { IProducto } from "../../interfaces/IProducto";

type Props = {
  id: string;
  producto: IProducto;
};

const ModalProducto = ({ id, producto }: Props) => {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <form method="dialog">
          <button className="absolute top-2 right-2 cursor-pointer">
            <X />
          </button>
        </form>
        <h3 className="font-bold text-lg text-center capitalize">
          {producto?.nombre}
        </h3>
        <hr />
        <div className="modal-body flex mt-4">
          <img src={producto?.imagen} alt={producto?.nombre} className="w-64" />
          <div className="flex flex-col gap-2 p-4">
            <p>
              <strong>Referencia:</strong> {producto?.referencia}
            </p>
            <p>
              <strong>Unidades:</strong> {producto?.unidades}
            </p>
            <p>
              <strong>Precio Entrada:</strong> ${producto?.precioEntrada}
            </p>
            <p>
              <strong>Precio Venta:</strong> ${producto?.precioVenta}
            </p>
            <p>
              <strong>Linea:</strong> {producto?.linea}
            </p>
            <p>
              <strong>Categoria:</strong> {producto?.categoria}
            </p>
            <p>
              <strong>Sub Categoria:</strong> {producto?.subCategoria}
            </p>
            <p>
              <strong>Descripcion:</strong> {producto?.descripcion}
            </p>
            {producto?.variaciones?.map((variacion) => (
              <div key={variacion.id}>
                <p>
                  <strong>Nombre Variacion:</strong> {variacion?.nombre}
                </p>
                <p>
                  <strong>Valor Variacion:</strong> {variacion?.valor}
                </p>
                <p>
                  <strong>Unidades Variacion:</strong> {variacion?.unidades}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalProducto;
