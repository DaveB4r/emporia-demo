import type { IProducto } from "../../interfaces/IProducto";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import ToastMessage from "../resources/ToastMessage";
import TableProductos from "./TableProductos";
import { formatWithSeparator } from "../../utils/formatValue";

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
  const [errors, setErrors] = useState({
    codigo: "",
    unidades: "",
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({ codigo: "", unidades: "", precio: "", descripcion: "" });
    if (!formInputs.codigo) {
      setErrors((prev) => ({
        ...prev,
        codigo: "Por favor indique el codigo del producto",
      }));
      return false;
    } else if (formInputs.unidades === 0) {
      setErrors((prev) => ({
        ...prev,
        unidades: "Las unidades deben ser mayor a 0",
      }));
      return false;
    } else if (!formInputs.precio) {
      setErrors((prev) => ({
        ...prev,
        precio: "Por favor indique el precio.",
      }));
      return false;
    } else if(!formInputs.descripcion) {
      setErrors((prev) => ({
        ...prev,
        descripcion: "Por favor indique una descripcion."
      }));
      return false;
    }
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
          <div className="form-control flex flex-col">
            <label htmlFor="codigo" className="label text-black">
              Codigo Producto
            </label>
            <input
              type="text"
              id="codigo"
              className={`input ${errors.codigo && "input-error"}`}
              placeholder="1234"
              value={formInputs.codigo}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, codigo: e.target.value }))
              }
            />
            <small className="text-sm text-red-700">{errors.codigo}</small>
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="unidades" className="label text-black">
              Unidades
            </label>
            <input
              type="number"
              id="unidades"
              className={`input ${errors.unidades && "input-error"}`}
              placeholder="2"
              value={formInputs.unidades}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  unidades: Number(e.target.value),
                }))
              }
            />
            <small className="text-sm text-red-700">{errors.unidades}</small>
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="precio" className="label text-black">
              Precio
            </label>
            <input
              type="text"
              id="precio"
              className={`input ${errors.precio && "input-error"}`}
              placeholder="50.000"
              value={formInputs.precio}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  precio: formatWithSeparator(e.target.value),
                }))
              }
            />
            <small className="text-sm text-red-700">{errors.precio}</small>
          </div>
        </div>
        <div className="form-control flex flex-col">
          <label htmlFor="descripcion" className="text-black">
            Descripcion producto
          </label>
          <textarea
            id="descripcion"
            className={`textarea h-24 w-full ${errors.descripcion && "textarea-error"}`}
            placeholder="Descripcion"
            value={formInputs.descripcion}
            onChange={(e) =>
              setFormInputs((prev) => ({
                ...prev,
                descripcion: e.target.value,
              }))
            }
          />
          <small className="text-sm text-red-700">{errors.descripcion}</small>
        </div>
        <button
          type="submit"
          className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        >
          Agregar
        </button>
      </fieldset>
      <div className="over-flow-x-auto flex flex-col gap-2 bg-white border border-gray-300 rounded-lg mx-4">
        <div className="w-full border-b-2">
          <h3 className="py-4 uppercase  text-center font-bold">
            Productos agregados
          </h3>
        </div>
        <TableProductos productos={productos} setProductos={setProductos} />
      </div>
    </form>
  );
};

export default GeneralForm;
