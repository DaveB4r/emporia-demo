import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { IProducto } from "../../../interfaces/IProducto";
import type { IClienteCredito } from "../../../interfaces/IClienteCredito";
import DatosCredito from "./DatosCredito";
import ResumenVenta from "../ResumenVenta";
import ModalVenta from "../ModalVenta";

type Props = {
  productos: IProducto[];
  setProductos: Dispatch<SetStateAction<IProducto[]>>;
};

const TabCredito = ({ productos, setProductos }: Props) => {
  const initialCredito: IClienteCredito = {
    cupo: 0,
    cedula: "",
    nombres: "",
    periodos: "",
    diasGracia: 0,
    numCuotas: 0,
    valorCuota: "",
  };
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [datosCredito, setDatosCredito] =
    useState<IClienteCredito>(initialCredito);
  const [errors, setErrors] = useState<IClienteCredito>(initialCredito);

  useEffect(() => {
    let subTotal = 0;
    if (productos.length > 0) {
      productos.map((producto) => {
        subTotal +=
          Number(String(producto.precioVenta).replaceAll(".", "")) *
          Number(producto.unidades);
      });
    }
    const newSubtotal = Math.ceil(subTotal / 1.19);
    setSubtotal(newSubtotal);
    setIva(subTotal - newSubtotal);
  }, [productos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const total = subtotal + iva;
    setErrors(initialCredito);
    if (datosCredito.cupo < total) {
      setErrors((prev) => ({ ...prev, cupo: -1 }));
      return false;
    } else if (!datosCredito.cedula) {
      setErrors((prev) => ({
        ...prev,
        cedula: "Por favor ingrese el numero de cedula del cliente.",
      }));
      return false;
    } else if (!datosCredito.nombres) {
      setErrors((prev) => ({
        ...prev,
        nombres: "Por favor ingrese los nombres del cliente.",
      }));
      return false;
    } else if (!datosCredito.periodos) {
      setErrors((prev) => ({
        ...prev,
        periodos: "Por favor seleccione un periodo",
      }));
      return false;
    } else if (datosCredito.diasGracia === 0) {
      setErrors((prev) => ({ ...prev, diasGracia: -1 }));
      return false;
    } else if (datosCredito.numCuotas === 0) {
      setErrors((prev) => ({ ...prev, numCuotas: -1 }));
      return false;
    }
    document.getElementById("modal_venta_credito").showModal();
  };

  return (
    <div className="flex flex-col w-full bg-base-200 py-4">
      <DatosCredito
        datosCredito={datosCredito}
        setDatosCredito={setDatosCredito}
        errors={errors}
        total={subtotal + iva}
      />
      <ResumenVenta subtotal={subtotal} iva={iva} />
      <button
        className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        disabled={subtotal === 0}
        onClick={handleSubmit}
      >
        Finalizar Venta
      </button>
      <ModalVenta
        id="modal_venta_credito"
        productos={productos}
        datosCredito={datosCredito}
        subtotal={subtotal}
        iva={iva}
        setDatosCredito={setDatosCredito}
        setProductos={setProductos}
        setIva={setIva}
        setSubtotal={setSubtotal}
        initialCredito={initialCredito}
      />
    </div>
  );
};

export default TabCredito;
