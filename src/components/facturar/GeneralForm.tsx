import { X } from "lucide-react";

const GeneralForm = () => {
  return (
    <form className="flex flex-col bg-base-200 py-4">
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
            />
          </div>
          <div className="form-control">
            <label htmlFor="unidades" className="label text-black">
              Unidades
            </label>
            <input
              type="text"
              id="unidades"
              className="input"
              placeholder="2"
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
          ></textarea>
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
            <tr>
              <td>2</td>
              <td>1234</td>
              <td>Camiseta</td>
              <td>$ 50.000</td>
              <td>
                <X className="cursor-pointer text-red-500" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1254</td>
              <td>Jean</td>
              <td>$ 90.000</td>
              <td>
                <X className="cursor-pointer text-red-500" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1487</td>
              <td>Chaqueta</td>
              <td>$ 150.000</td>
              <td>
                <X className="cursor-pointer text-red-500" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default GeneralForm;
