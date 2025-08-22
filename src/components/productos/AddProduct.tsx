import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { IProducto, IVariacion } from "../../interfaces/IProducto";
import { formatWithSeparator } from "../../utils/formatValue";
import { useAppContext } from "../../context/AppContext";
import ToastMessage from "../resources/ToastMessage";
import { Plus, X } from "lucide-react";

const AddProduct = () => {
  const { dispatch } = useAppContext();
  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: "",
    type: "",
  });
  let id = Math.random().toString(36).substring(2, 10);
  const initialProducto: IProducto = {
    id: id,
    imagen: "",
    precioEntrada: "",
    precioVenta: "",
    linea: "",
    categoria: "",
    subCategoria: "",
    nombre: "",
    referencia: "",
    descripcion: "",
    unidades: 0,
    variaciones: [],
  };
  const [data, setData] = useState<IProducto>(initialProducto);
  const [errors, setErrors] = useState<IProducto>(initialProducto);

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

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    if (!file) return;
    const fileSizeinMB = file.size / (1024 * 1024);
    if (fileSizeinMB > 10) {
      return;
    }
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, imagen: reader.result as string }));
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id = Math.random().toString(36).substring(2, 10);
    let variacionErrors = false;
    setData((prev) => ({ ...prev, id: id }));
    setErrors(initialProducto);
    if (!data.imagen) {
      setErrors((prev) => ({
        ...prev,
        imagen: "¡Selecciones una foto!",
      }));
      return;
    }
    if (!data.precioEntrada) {
      setErrors((prev) => ({
        ...prev,
        precioEntrada: "¡Indique el precio de entrada!",
      }));
      return;
    }
    if (!data.precioVenta) {
      setErrors((prev) => ({
        ...prev,
        precioVenta: "¡Indique el precio de venta!",
      }));
      return;
    }
    if (!data.linea) {
      setErrors((prev) => ({
        ...prev,
        linea: "¡Indique la linea!",
      }));
      return;
    }
    if (!data.categoria) {
      setErrors((prev) => ({
        ...prev,
        categoria: "¡Indique la categoria!",
      }));
      return;
    }
    if (!data.nombre) {
      setErrors((prev) => ({
        ...prev,
        nombre: "¡Indique el nombre de producto!",
      }));
      return;
    }
    if (!data.referencia) {
      setErrors((prev) => ({
        ...prev,
        referencia: "¡Indique la referencia de producto!",
      }));
      return;
    }
    if (data.unidades === 0) {
      setErrors((prev) => ({
        ...prev,
        unidades: -1,
      }));
      return;
    }
    if (
      Number(String(data.precioEntrada).replaceAll(".", "")) >
      Number(String(data.precioVenta).replaceAll(".", ""))
    ) {
      setErrors((prev) => ({
        ...prev,
        precioEntrada:
          "El Precio de entrada no puede ser mayor al precio de venta!",
      }));
      return;
    }
    if (data.variaciones && data.variaciones.length > 0) {
      data.variaciones?.map((v) => {
        if (!v.nombre) {
          setErrors((prev) => ({
            ...prev,
            variaciones: [
              ...(prev.variaciones || []),
              { ...v, nombre: "Por favor ingrese el nombre de la variacion" },
            ],
          }));
          variacionErrors = true;
          return;
        }
        if (!v.valor) {
          setErrors((prev) => ({
            ...prev,
            variaciones: [
              ...(prev.variaciones || []),
              { ...v, valor: "Por favor ingrese el valor de la variacion" },
            ],
          }));
          variacionErrors = true;
          return;
        }
      });
    }
    if (variacionErrors) return;
    console.log(variacionErrors);
    dispatch({ type: "ADD_PRODUCT", producto: data });
    setData(initialProducto);
    setToastInfo({
      show: true,
      message: "Producto Guardado satisfactoriamente",
      type: "alert-success",
    });
  };

  const addVariacion = () => {
    const idVariacion = Math.random().toString(36).substring(2, 10);
    const newVariacion: IVariacion = {
      id: idVariacion,
      nombre: "",
      valor: "",
      unidades: 0,
    };
    setData((prev) => ({
      ...prev,
      variaciones: [...(prev.variaciones || []), newVariacion],
    }));
  };

  const deleteVariacion = (id: string) => {
    setData((prev) => ({
      ...prev,
      variaciones: [...(prev.variaciones?.filter((v) => v.id !== id) || [])],
    }));
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      id="form_productos"
    >
      {toastInfo.show && (
        <ToastMessage type={toastInfo.type} message={toastInfo.message} />
      )}
      <h3 className="text-2xl text-center capitalize p-4 bg-black w-full rounded-t-lg font-bold text-white">
        Nuevo producto
      </h3>
      <form
        className="space-y-4 bg-slate-200 p-4 w-full rounded-b-2xl"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label
            htmlFor="imagen"
            className="flex flex-col justify-center items-center gap-2"
          >
            <b className="text-sm">Foto Producto</b>
            <input
              type="file"
              id="imagen"
              className={`file-input file-input-xs ${
                errors.imagen ? "file-input-error" : "file-input-neutral"
              }`}
              onChange={handleChangeImage}
            />
            {errors.imagen && (
              <small className="text-xs text-red-700">{errors.imagen}</small>
            )}
            {data.imagen && (
              <div className="space-y-2">
                <img
                  src={data.imagen}
                  alt="Product Image"
                  width={270}
                  height={150}
                  className="h-36 w-36 rounded-xl object-cover"
                />
              </div>
            )}
          </label>
        </div>
        <div className="flex space-y-2 flex-col md:flex-row gap-2">
          <label htmlFor="precioEntrada" className="capitalize">
            <b className="text-sm">Precio entrada</b>
            <input
              type="text"
              id="precioEntrada"
              className={`input ${errors.precioEntrada && "input-error"}`}
              value={data.precioEntrada}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  precioEntrada: formatWithSeparator(e.target.value),
                }))
              }
              autoComplete="off"
            />
            {errors.precioEntrada && (
              <small className="text-xs text-red-700">
                {errors.precioEntrada}
              </small>
            )}
          </label>
          <label htmlFor="precioVenta" className="capitalize">
            <b className="text-sm">Precio Venta</b>
            <input
              type="text"
              id="precioVenta"
              className={`input ${errors.precioVenta && "input-error"}`}
              value={data.precioVenta}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  precioVenta: formatWithSeparator(e.target.value),
                }))
              }
              autoComplete="off"
            />
            {errors.precioVenta && (
              <small className="text-xs text-red-700">
                {errors.precioVenta}
              </small>
            )}
          </label>
        </div>
        <hr />
        <div className="flex space-y-2 flex-col md:flex-row gap-2">
          <label htmlFor="linea" className="capitalize">
            <b className="text-sm">linea</b>
            <input
              type="text"
              id="linea"
              className={`input ${errors.linea && "input-error"}`}
              value={data.linea}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  linea: e.target.value,
                }))
              }
              autoComplete="off"
            />
            {errors.linea && (
              <small className="text-xs text-red-700">{errors.linea}</small>
            )}
          </label>
          <label htmlFor="categoria" className="capitalize">
            <b className="text-sm">categoria</b>
            <input
              type="text"
              id="categoria"
              className={`input ${errors.categoria && "input-error"}`}
              value={data.categoria}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  categoria: e.target.value,
                }))
              }
              autoComplete="off"
            />
            {errors.categoria && (
              <small className="text-xs text-red-700">{errors.categoria}</small>
            )}
          </label>
        </div>
        <div className="flex space-y-2 flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="subCategoria" className="capitalize text-center">
            <b className="text-sm">sub Categoria</b>
            <input
              type="text"
              id="subCategoria"
              className="input"
              value={data.subCategoria}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  subCategoria: e.target.value,
                }))
              }
              autoComplete="off"
            />
          </label>
        </div>
        <hr />
        <div className="flex space-y-2 flex-col md:flex-row gap-2">
          <label htmlFor="nombre" className="capitalize">
            <b className="text-sm">Nombre Producto</b>
            <input
              type="text"
              id="nombre"
              className={`input ${errors.nombre && "input-error"}`}
              value={data.nombre}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  nombre: e.target.value,
                }))
              }
              autoComplete="off"
            />
            {errors.nombre && (
              <small className="text-xs text-red-700">{errors.nombre}</small>
            )}
          </label>
          <label htmlFor="referencia" className="capitalize">
            <b className="text-sm">referencia</b>
            <input
              type="text"
              id="referencia"
              className={`input ${errors.referencia && "input-error"}`}
              value={data.referencia}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  referencia: e.target.value,
                }))
              }
              autoComplete="off"
            />
            {errors.referencia && (
              <small className="text-xs text-red-700">
                {errors.referencia}
              </small>
            )}
          </label>
          <label htmlFor="unidades" className="capitalize">
            <b className="text-sm">unidades</b>
            <input
              type="number"
              id="unidades"
              className={`input ${errors.unidades === -1 && "input-error"}`}
              value={data.unidades}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  unidades: Number(e.target.value),
                }))
              }
            />
            {errors.unidades === -1 && (
              <small className="text-xs text-red-700">
                Por favor indique las unidades
              </small>
            )}
          </label>
        </div>
        <div className="flex space-y-2 flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="descripcion" className="capitalize text-center">
            <b className="text-sm">Descripcion producto</b>
            <input
              type="text"
              id="descripcion"
              className="input"
              value={data.descripcion}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
              autoComplete="off"
            />
          </label>
        </div>
        {data.variaciones &&
          data.variaciones.length > 0 &&
          data.variaciones.map((variacion) => (
            <div className="flex flex-col" key={variacion.id}>
              <div className="flex flex-col md:flex-row">
                <label htmlFor={`nombreVariacion${variacion.id}`} className="">
                  <b className="text-xs">Nombre Variacion</b>
                  <input
                    type="text"
                    className="input"
                    placeholder="Color"
                    id={`nombreVariacion${variacion.id}`}
                    value={variacion.nombre}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        variaciones: prev.variaciones?.map((v) =>
                          v.id === variacion.id
                            ? { ...v, nombre: e.target.value }
                            : v
                        ),
                      }))
                    }
                  />
                </label>
                <label htmlFor={`valorVariacion${variacion.id}`} className="">
                  <b className="text-xs">Valor Variacion</b>
                  <input
                    type="text"
                    className="input"
                    placeholder="Rojo"
                    id={`valorVariacion${variacion.id}`}
                    value={variacion.valor}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        variaciones: prev.variaciones?.map((v) =>
                          v.id === variacion.id
                            ? { ...v, valor: e.target.value }
                            : v
                        ),
                      }))
                    }
                  />
                </label>
                <label
                  htmlFor={`unidadesVariacion${variacion.id}`}
                  className=""
                >
                  <b className="text-xs">Unidades Variacion</b>
                  <input
                    type="number"
                    className="input"
                    placeholder="0"
                    min={1}
                    id={`unidadesVariacion${variacion.id}`}
                    value={variacion.unidades}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        variaciones: prev.variaciones?.map((v) =>
                          v.id === variacion.id
                            ? { ...v, unidades: Number(e.target.value) }
                            : v
                        ),
                      }))
                    }
                  />
                </label>
                <X
                  className="w-12 h-12 text-red-600 cursor-pointer"
                  onClick={() => deleteVariacion(variacion.id)}
                />
              </div>
              {errors.variaciones &&
                errors.variaciones.length > 0 &&
                errors.variaciones.map((errorVariacion) =>
                  errorVariacion.id === variacion.id &&
                  errorVariacion.nombre !== variacion.nombre ? (
                    <small
                      key={`error-${errorVariacion.id}`}
                      className="text-red-700"
                    >
                      {errorVariacion.nombre}
                    </small>
                  ) : errorVariacion.valor !== variacion.valor ? (
                    <small
                      key={`error-${errorVariacion.id}`}
                      className="text-red-700"
                    >
                      {errorVariacion.valor}
                    </small>
                  ) : (
                    <small
                      key={`error-${errorVariacion.id}`}
                      className="text-red-700"
                    >
                      {errorVariacion.unidades}
                    </small>
                  )
                )}
            </div>
          ))}
        <div className="space-y-2 flex justify-center items-center">
          <button
            className="btn btn-outline btn-neutral btn-md "
            type="button"
            onClick={addVariacion}
          >
            <Plus /> Agregar Variacion
          </button>
        </div>
        <div className="my-2 space-y-2 flex justify-center items-center">
          <button
            id="btn_guardar_producto"
            className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
            type="submit"
          >
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
