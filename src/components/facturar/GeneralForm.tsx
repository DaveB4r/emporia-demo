import { X } from "lucide-react";
import type { IProducto } from "../../interfaces/IProducto";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import ToastMessage from "../resources/ToastMessage";

type Props = {
  productos: IProducto[];
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
};

const GeneralForm = ({ productos, setProductos }: Props) => {
  let id = Math.random().toString(36).substring(2, 10);
  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [formInputs, setFormInputs] = useState<IProducto>({
    id: id,
    codigo: "",
    unidades: 0,
    precio: "",
    descripcion: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setToastInfo({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastInfo]);

  const formatWithSeparator = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, "");
    return cleaned ? Number(cleaned).toLocaleString("es-CO") : "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id = Math.random().toString(36).substring(2, 10);
    setProductos((prev) => [...prev, formInputs]);
    setFormInputs({
      id: id,
      codigo: "",
      unidades: 0,
      precio: "",
      descripcion: "",
    });
    setToastInfo({
      show: true,
      message: "Producto Guardado Satisfactoriamente",
      type: "alert-success",
    });
  };

  return (
    <form className="flex flex-col bg-base-200 py-4" onSubmit={handleSubmit}>
      {toastInfo.show && (
        <ToastMessage type={toastInfo.type} message={toastInfo.message} />
      )}
      <fieldset className="fieldset border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend uppercase font-bold text-2xl text-center">
          facturar
        </legend>
        <div className="flex gap-2">
          <div className="form-control">
            <label htmlFor="codigo" className="label text-black">
              Codigo Producto
            </label>
            <input
              type="text"
              id="codigo"
              className="input"
              placeholder="1234"
              value={formInputs.codigo}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, codigo: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="unidades" className="label text-black">
              Unidades
            </label>
            <input
              type="number"
              min={1}
              id="unidades"
              className="input"
              placeholder="2"
              value={formInputs.unidades}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  unidades: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="precio" className="label text-black">
              Precio
            </label>
            <input
              type="text"
              id="precio"
              className="input"
              placeholder="50.000"
              value={formInputs.precio}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  precio: formatWithSeparator(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <div className="form-control flex flex-col">
          <label htmlFor="descripcion" className="text-black">
            Descripcion producto
          </label>
          <textarea
            id="descripcion"
            className="textarea h-24 w-full"
            placeholder="Descripcion"
            value={formInputs.descripcion}
            onChange={(e) =>
              setFormInputs((prev) => ({
                ...prev,
                descripcion: e.target.value,
              }))
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        >
          Guardar
        </button>
      </fieldset>
      <div className="over-flow-x-auto flex flex-col gap-2 bg-white border border-gray-300 rounded-lg mx-4">
        <div className="w-full border-b-2 ">
          <h3 className="py-4 uppercase  text-center font-bold">
            Productos agregados
          </h3>
        </div>
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
                    <X className="cursor-pointer text-red-500" />
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
      </div>
    </form>
  );
};

export default GeneralForm;
