import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { IProducto } from "../../../interfaces/IProducto";
import DatosCliente from "./DatosCliente";
import type { IClienteContado } from "../../../interfaces/IClienteContado";
import ResumenVenta from "../ResumenVenta";
import ModalVenta from "../ModalVenta";
import { formatWithSeparator } from "../../../utils/formatValue";

type Props = {
  productos: IProducto[];
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
  type: "contado" | "separado";
  recalculate: boolean;
};

const TabContado = ({ productos, setProductos, type, recalculate }: Props) => {
  const initialCliente: IClienteContado = {
    cedula: "",
    verificacion: "",
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
  };
  if (type === "separado") initialCliente.abono = "";
  const [id] = useState(`modal_venta_${type}`);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [datosCliente, setDatosCliente] =
    useState<IClienteContado>(initialCliente);
  const [errors, setErrors] = useState<IClienteContado>(initialCliente);

  useEffect(() => {
    let subTotal = 0;
    if (productos.length > 0) {
      productos.map((producto) => {
        subTotal +=
          Number(String(producto.precioVenta).replaceAll(".", "")) *
          Number(producto.unidadesFacturar);
      });
    }
    const newSubtotal = Math.ceil(subTotal / 1.19);
    setSubtotal(newSubtotal);
    setIva(subTotal - newSubtotal);
  }, [productos, recalculate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(initialCliente);
    const total = subtotal + iva;

    if (!datosCliente.cedula) {
      setErrors((prev) => ({
        ...prev,
        cedula: "Por favor ingrese el numero de cedula!",
      }));
      return false;
    } else if (!datosCliente.verificacion) {
      setErrors((prev) => ({
        ...prev,
        verificacion: "Por favor ingrese el digito de verificacion!",
      }));
      return false;
    } else if (!datosCliente.nombre) {
      setErrors((prev) => ({
        ...prev,
        nombre: "Por favor ingrese el Nombre!",
      }));
      return false;
    } else if (!datosCliente.apellido) {
      setErrors((prev) => ({
        ...prev,
        apellido: "Por favor ingrese el apellido",
      }));
      return false;
    } else if (!datosCliente.correo) {
      setErrors((prev) => ({
        ...prev,
        correo: "Por favor ingrese el correo!",
      }));
      return false;
    } else if (!datosCliente.celular) {
      setErrors((prev) => ({
        ...prev,
        celular: "Por favor ingrese el celular!",
      }));
      return false;
    } else if (type === "separado" && !datosCliente.abono) {
      setErrors((prev) => ({
        ...prev,
        abono: "Por favor indique cuanto desea abonar!",
      }));
      return false;
    } else if (
      total < Number(String(datosCliente.abono).replaceAll(".", "")) &&
      type === "separado"
    ) {
      setErrors((prev) => ({
        ...prev,
        abono: "El abono no puede ser mayor al valor a pagar!",
      }));
      return false;
    }
    (document.getElementById(id) as HTMLFormElement).showModal();
  };

  return (
    <div className="flex flex-col w-full bg-base-200 py-4">
      <DatosCliente
        datosCliente={datosCliente}
        setDatosCliente={setDatosCliente}
        errors={errors}
      />
      <ResumenVenta subtotal={subtotal} iva={iva} />
      {type === "separado" && (
        <div className="form-control my-2 w-full flex flex-col justify-center items-center">
          <label
            htmlFor="abono"
            className="label text-black text-4xl uppercase font-bold mb-2"
          >
            Abono
          </label>
          <input
            type="text"
            className={`w-[80%] input ${errors.abono && "input-error"}`}
            placeholder="50.000"
            value={datosCliente.abono}
            onChange={(e) =>
              setDatosCliente((prev) => ({
                ...prev,
                abono: formatWithSeparator(e.target.value),
              }))
            }
          />
          <small className="text-red-600 text-sm">{errors.abono}</small>
        </div>
      )}
      <button
        className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        disabled={subtotal === 0}
        onClick={handleSubmit}
      >
        Finalizar Venta
      </button>
      <ModalVenta
        id={id}
        datosCliente={datosCliente}
        subtotal={subtotal}
        iva={iva}
        setDatosCliente={setDatosCliente}
        setProductos={setProductos}
        setIva={setIva}
        setSubtotal={setSubtotal}
        initialCliente={initialCliente}
      />
    </div>
  );
};

export default TabContado;
