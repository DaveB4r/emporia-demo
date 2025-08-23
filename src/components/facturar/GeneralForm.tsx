import type { IProducto } from "../../interfaces/IProducto";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import ToastMessage from "../resources/ToastMessage";
import { useAppContext } from "../../context/AppContext";
import type { IOption } from "../../interfaces/IOption";
import Select, { type SingleValue } from "react-select";
import TableProductosFacturar from "./TableProductosFacturar";

type Props = {
  productosFacturar: IProducto[];
  setProductosFacturar: Dispatch<SetStateAction<IProducto[]>>;
  setRecalculate: Dispatch<SetStateAction<boolean>>;
};

const GeneralForm = ({
  productosFacturar,
  setProductosFacturar,
  setRecalculate,
}: Props) => {
  const initialOption: IOption = {
    value: "",
    label: "",
  };
  const { state } = useAppContext();
  const [errors, setErrors] = useState({
    productoSelected: "",
    unidades: "",
  });
  const [productoSelected, setProductoSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState<IOption>(initialOption);
  const [unidades, setUnidades] = useState(0);
  const [maxUnidades, setMaxUnidades] = useState(0);
  const [options, setOptions] = useState<IOption[]>([initialOption]);
  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setOptions([initialOption]);
    if (options.length === 1) {
      state.productos.map((producto) =>
        setOptions((prev) => [
          ...prev,
          {
            value: `${producto.id}:${producto.unidades}`,
            label: `${producto.referencia} ${producto.nombre} $${producto.precioVenta} ( ${producto.unidades} Unidades disponibles )`,
          },
        ])
      );
    }
  }, []);

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

  const handleSelection = (value: SingleValue<IOption>) => {
    setSelectedOption({
      value: value?.value as string,
      label: value?.label as string,
    });
    const id = String(value?.value).split(":")[0];
    const productoUnidades = Number(String(value?.value).split(":")[1]);
    let quantityExceded = false;
    productosFacturar.filter((productoFactura) => {
      if (
        productoFactura.id === id &&
        Number(productoFactura.unidadesFacturar) >= productoUnidades
      ) {
        quantityExceded = true;
      }
    });
    if (quantityExceded) {
      setErrors((prev) => ({
        ...prev,
        unidades: "Ya selecciono todas las unidades disponibles",
      }));
      setMaxUnidades(0);
      return;
    }
    setProductoSelected(id);
    setMaxUnidades(productoUnidades);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({
      productoSelected: "",
      unidades: "",
    });
    if (!productoSelected) {
      setErrors((errors) => ({
        ...errors,
        productoSelected: "Por favor seleccione un producto!",
      }));
      return;
    }
    if (unidades === 0) {
      setErrors((errors) => ({
        ...errors,
        unidades: "Seleccione al menos una unidad!",
      }));
      return;
    }
    let exists = false;
    productosFacturar.map((productoFacturar) => {
      if (
        productoFacturar.id === productoSelected &&
        productoFacturar.unidadesFacturar
      ) {
        productoFacturar.unidadesFacturar += unidades;
        exists = true;
      }
    });
    if (!exists) {
      state.productos.filter((producto) => {
        if (producto.id === productoSelected) {
          setProductosFacturar((prev) => [
            ...prev,
            { ...producto, unidadesFacturar: unidades },
          ]);
        }
      });
    }
    setRecalculate((recalculate) => !recalculate);
    setSelectedOption(initialOption);
    setUnidades(0);
    setProductoSelected("");
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
            <label htmlFor="select_producto" className="label text-black">
              Seleccionar Producto
            </label>
            <Select
              options={options}
              className={`w-96 ${
                errors.productoSelected && "border border-red-700"
              }`}
              id="select_producto"
              value={selectedOption}
              onChange={handleSelection}
            />
            <small className="text-xs text-red-700">
              {errors.productoSelected}
            </small>
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="unidades" className="label text-black">
              Unidades
            </label>
            <input
              type="number"
              id="unidades"
              className={`w-16 input ${errors.unidades && "input-error"}`}
              max={maxUnidades}
              value={unidades}
              onChange={(e) => setUnidades(Number(e.target.value))}
            />
            <small className="text-xs text-red-700">{errors.unidades}</small>
          </div>
        </div>
        <button
          id="agrega_producto"
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
        <TableProductosFacturar
          productosFacturar={productosFacturar}
          setProductosFacturar={setProductosFacturar}
        />
      </div>
    </form>
  );
};

export default GeneralForm;
