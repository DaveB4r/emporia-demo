import type { Dispatch, SetStateAction } from "react";
import type { IProducto } from "../../interfaces/IProducto";
import { X } from "lucide-react";

type Props = {
  productosFacturar: IProducto[];
  setProductosFacturar: Dispatch<SetStateAction<IProducto[]>>;
};

const TableProductosFacturar = ({
  productosFacturar,
  setProductosFacturar,
}: Props) => {
  const deleteProducto = (id: string) => {
    setProductosFacturar(
      productosFacturar.filter((producto) => producto.id !== id)
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Unidades</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productosFacturar.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.referencia}</td>
              <td>{producto.nombre}</td>
              <td>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td>{producto.precioVenta}</td>
              <td>{producto.unidadesFacturar}</td>
              <td>
                <X
                  className="w-8 h-8 text-red-600 cursor-pointer"
                  onClick={() => deleteProducto(producto.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProductosFacturar;
