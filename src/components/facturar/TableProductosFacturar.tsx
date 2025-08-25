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
            <th className="text-xs md:text-sm">Ref</th>
            <th className="text-xs md:text-sm">Nombre</th>
            <th className="text-xs md:text-sm hidden md:table-cell">Imagen</th>
            <th className="text-xs md:text-sm">Precio</th>
            <th className="text-xs md:text-sm">Unidades</th>
            <th className="text-xs md:text-sm">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productosFacturar.map((producto) => (
            <tr key={producto.id}>
              <td className="text-xs md:text-sm">{producto.referencia}</td>
              <td className="text-xs md:text-sm">{producto.nombre}</td>
              <td className="text-xs md:text-sm hidden md:table-cell">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="text-xs md:text-sm">{producto.precioVenta}</td>
              <td className="text-xs md:text-sm">{producto.unidadesFacturar}</td>
              <td className="text-xs md:text-sm">
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
