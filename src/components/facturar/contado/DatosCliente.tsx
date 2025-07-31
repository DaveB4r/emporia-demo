import type { Dispatch, SetStateAction } from "react";
import type { IClienteContado } from "../../../interfaces/IClienteContado";

type Props = {
  datosCliente: IClienteContado;
  setDatosCliente: Dispatch<SetStateAction<IClienteContado>>;
  errors: IClienteContado;
};

const DatosCliente = ({ datosCliente, setDatosCliente, errors }: Props) => {
  return (
    <form className="flex flex-col py-4">
      <fieldset className="fieldset border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend uppercase font-bold text-2xl text-center">
          datos del cliente
        </legend>
        <div className="flex gap-2">
          <div className="form-control w-full flex flex-col">
            <label htmlFor="cedula" className="label text-black">
              Cedula
            </label>
            <input
              type="text"
              id="cedula"
              className={`input ${errors.cedula && "input-error"}`}
              placeholder="1017455658"
              value={datosCliente.cedula}
              onChange={(e) =>
                setDatosCliente((prev) => ({ ...prev, cedula: e.target.value }))
              }
            />
            <small className="text-red-600 text-sm">{errors.cedula}</small>
          </div>
          <div className="form-control w-full flex flex-col">
            <label htmlFor="verificacion" className="label text-black">
              Digito verificacion
            </label>
            <input
              type="number"
              id="verificacion"
              className={`input ${errors.verificacion && "input-error"}`}
              placeholder="2"
              value={datosCliente.verificacion}
              onChange={(e) =>
                setDatosCliente((prev) => ({
                  ...prev,
                  verificacion: e.target.value,
                }))
              }
            />
            <small className="text-red-600 text-sm">{errors.verificacion}</small>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-full flex flex-col">
            <label htmlFor="nombre" className="label text-black">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className={`input ${errors.nombre && "input-error"}`}
              placeholder="John"
              value={datosCliente.nombre}
              onChange={(e) =>
                setDatosCliente((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
            <small className="text-red-600 text-sm">{errors.nombre}</small>
          </div>
          <div className="form-control w-full flex flex-col">
            <label htmlFor="apellido" className="label text-black">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              className={`input ${errors.apellido && "input-error"}`}
              placeholder="Doe"
              value={datosCliente.apellido}
              onChange={(e) =>
                setDatosCliente((prev) => ({
                  ...prev,
                  apellido: e.target.value,
                }))
              }
            />
            <small className="text-red-600 text-sm">{errors.apellido}</small>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-full flex flex-col">
            <label htmlFor="correo" className="label text-black">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              className={`input ${errors.correo && "input-error"}`}
              placeholder="johndoe@mail.co"
              value={datosCliente.correo}
              onChange={(e) =>
                setDatosCliente((prev) => ({ ...prev, correo: e.target.value }))
              }
            />
            <small className="text-red-600 text-sm">{errors.correo}</small>
          </div>
          <div className="form-control w-full flex flex-col">
            <label htmlFor="celular" className="label text-black">
              Celular
            </label>
            <input
              type="tel"
              id="celular"
              className={`input ${errors.celular && "input-error"}`}
              placeholder="3004158877"
              value={datosCliente.celular}
              onChange={(e) =>
                setDatosCliente((prev) => ({
                  ...prev,
                  celular: e.target.value,
                }))
              }
            />
            <small className="text-red-600 text-sm">{errors.celular}</small>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default DatosCliente;
