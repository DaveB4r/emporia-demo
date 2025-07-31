import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { IProducto } from "../../../interfaces/IProducto";
import DatosCliente from "./DatosCliente";
import { formatWithSeparator } from "../../../utils/formatValue";
import type { IClienteContado } from "../../../interfaces/IClienteContado";
import ModalVenta from "./ModalVenta";

type Props = {
  productos: IProducto[];
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
};

const TabContado = ({ productos, setProductos }: Props) => {
  const initialCliente: IClienteContado = {
    cedula: "",
    verificacion: "",
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
  };
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
          Number(String(producto.precio).replaceAll(".", "")) *
          producto.unidades;
      });
    }
    setIva(subTotal * 0.19);
    setSubtotal(subTotal);
  }, [productos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(initialCliente);
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
    }
    document.getElementById("modal_venta").showModal();
  };

  return (
    <div className="flex flex-col w-full bg-base-200 py-4">
      <DatosCliente
        datosCliente={datosCliente}
        setDatosCliente={setDatosCliente}
        errors={errors}
      />
      <div className="flex flex-col w-full gap-3">
        <div className="w-full border-b-2">
          <h3 className="py-4 uppercase text-center font-bold text-2xl">
            resumen compra
          </h3>
        </div>
        <p className="text-black text-center">
          <span className="text-xl uppercase font-bold">subtotal:</span>
          {" $"}
          {formatWithSeparator(String(subtotal))}
        </p>
        <p className="text-black text-center">
          <span className="text-xl uppercase font-bold">iva:</span>
          {" $"}
          {formatWithSeparator(String(iva))}
        </p>
        <p className="text-center text-red-600 font-bold">
          <span className="text-2xl uppercase font-black">total:</span>
          {" $"}
          {formatWithSeparator(String(subtotal + iva))}
        </p>
        <button
          className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          disabled={subtotal === 0}
          onClick={handleSubmit}
        >
          Finalizar venta
        </button>
      </div>
      <ModalVenta
        productos={productos}
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
