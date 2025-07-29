import { X } from "lucide-react";
import type { IProducto } from "../../interfaces/IProducto";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  productos: IProducto[];
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
};

const TableProductos = ({ productos, setProductos }: Props) => {
  const deleteProducto = (id: string) => {
    setProductos((prev) => prev.filter((producto) => producto.id != id));
  };

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Unidades</th>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {productos.length > 0 ? (
          productos.map((item, index) => (
            <tr key={index}>
              <td>{item.unidades}</td>
              <td>{item.codigo}</td>
              <td>{item.descripcion}</td>
              <td>$ {item.precio}</td>
              <td>
                <X
                  onClick={() => deleteProducto(item.id)}
                  className="cursor-pointer text-red-500"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No hay productos agregados</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableProductos;
