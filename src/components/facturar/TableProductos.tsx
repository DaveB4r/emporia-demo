import { X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

type Props = {
  venta?: boolean;
};

const TableProductos = ({ venta }: Props) => {
  const { state, dispatch } = useAppContext();
  const deleteProducto = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", productId: id });
  };

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Precio</th>
          {!venta && <th>Eliminar</th>}
        </tr>
      </thead>
      <tbody>
        {state.productos.length > 0 ? (
          state.productos.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td>{item.referencia}</td>
              <td>{item.nombre}</td>
              <td>$ {item.precioVenta}</td>
              {!venta && (
                <td>
                  <X
                    onClick={() => deleteProducto(item.id)}
                    className="cursor-pointer text-red-500"
                  />
                </td>
              )}
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
