import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { IProducto } from "../../interfaces/IProducto";
import { formatWithSeparator } from "../../utils/formatValue";
import { useAppContext } from "../../context/AppContext";
import ToastMessage from "../resources/ToastMessage";

const AddProduct = () => {
  const { dispatch } = useAppContext();
  const [toastInfo, setToastInfo] = useState({
    show: false,
    message: "",
    type: "",
  });
  let id = Math.random().toString(36).substring(2, 10);
  const initialProducto = {
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
  };
  const [data, setData] = useState<IProducto>(initialProducto);

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
    setData((prev) => ({ ...prev, id: id }));
    dispatch({ type: "ADD_PRODUCT", producto: data });
    setData(initialProducto);
    setToastInfo({
      show: true,
      message: "Producto Guardado satisfactoriamente",
      type: "alert-success",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
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
            <b>Foto Producto</b>
            <input
              type="file"
              id="imagen"
              className="input"
              onChange={handleChangeImage}
            />
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
            <b>Precio entrada</b>
            <input
              type="text"
              id="precioEntrada"
              className="input"
              value={data.precioEntrada}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  precioEntrada: formatWithSeparator(e.target.value),
                }))
              }
            />
          </label>
          <label htmlFor="precioVenta" className="capitalize">
            <b>Precio Venta</b>
            <input
              type="text"
              id="precioVenta"
              className="input"
              value={data.precioVenta}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  precioVenta: formatWithSeparator(e.target.value),
                }))
              }
            />
          </label>
        </div>
        <hr />
        <div className="flex space-y-2 flex-col md:flex-row gap-2">
          <label htmlFor="linea" className="capitalize">
            <b>linea</b>
            <input
              type="text"
              id="linea"
              className="input"
              value={data.linea}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  linea: e.target.value,
                }))
              }
            />
          </label>
          <label htmlFor="categoria" className="capitalize">
            <b>categoria</b>
            <input
              type="text"
              id="categoria"
              className="input"
              value={data.categoria}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  categoria: e.target.value,
                }))
              }
            />
          </label>
        </div>
        <div className="flex space-y-2 flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="subCategoria" className="capitalize text-center">
            <b>sub Categoria</b>
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
            />
          </label>
        </div>
        <hr />
        <div className="flex space-y-2 flex-col md:flex-row gap-2">
          <label htmlFor="nombre" className="capitalize">
            <b>Nombre Producto</b>
            <input
              type="text"
              id="nombre"
              className="input"
              value={data.nombre}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  nombre: e.target.value,
                }))
              }
            />
          </label>
          <label htmlFor="referencia" className="capitalize">
            <b>referencia</b>
            <input
              type="text"
              id="referencia"
              className="input"
              value={data.referencia}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  referencia: e.target.value,
                }))
              }
            />
          </label>
        </div>
        <div className="flex space-y-2 flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="descripcion" className="capitalize text-center">
            <b>Descripcion producto</b>
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
            />
          </label>
        </div>
        <div className="my-2 space-y-2 flex justify-center items-center">
          <button
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
