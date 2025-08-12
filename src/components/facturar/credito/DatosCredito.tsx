import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IClienteCredito } from "../../../interfaces/IClienteCredito";
import { formatWithSeparator } from "../../../utils/formatValue";

type Props = {
  datosCredito: IClienteCredito;
  setDatosCredito: Dispatch<SetStateAction<IClienteCredito>>;
  errors: IClienteCredito;
  total: number;
};

const nombres = [
  { cedula: "000", nombre: "John Doe", cupo: 1500000 },
  { cedula: "111", nombre: "Marta Vermudez", cupo: 1700000 },
  { cedula: "222", nombre: "Ana Pérez", cupo: 180000 },
  { cedula: "333", nombre: "María Jiménez", cupo: 150000 },
  { cedula: "444", nombre: "Juan Mendoza", cupo: 1200000 },
  { cedula: "555", nombre: "María Jiménez", cupo: 1000000 },
  { cedula: "666", nombre: "María López", cupo: 500000 },
  { cedula: "777", nombre: "Laura Cortés", cupo: 50000 },
  { cedula: "888", nombre: "Felipe Hernández", cupo: 200000 },
  { cedula: "999", nombre: "Valentina Moreno", cupo: 2500000 },
];

const DatosCredito = ({
  datosCredito,
  setDatosCredito,
  errors,
  total,
}: Props) => {
  const [opcionesDeCuotas, setOpcionesDeCuotas] = useState<number[]>([]);
  const getName = (cedula: string) => {
    const data = nombres.filter((nombre) => nombre.cedula === cedula)[0];
    setDatosCredito((prev) => ({
      ...prev,
      nombres: data ? data.nombre : "Juan Perez",
      cupo: data ? data.cupo : 1200000,
    }));
  };

  const handleCuotas = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    opcion: number
  ) => {
    setDatosCredito((prev) => ({
      ...prev,
      numCuotas: Number(e.target.value),
      valorCuota: valCuota(index, opcion),
    }));
  };

  const handlePeriodos = (e: ChangeEvent<HTMLSelectElement>) => {
    setDatosCredito((prev) => ({
      ...prev,
      periodos: e.target.value,
    }));
    setOpcionesDeCuotas([]);
    const numPeriodos = e.target.value === "quincenal" ? 2 : 1;
    for (let i = 2 * numPeriodos; i < 6 * numPeriodos; i += numPeriodos) {
      setOpcionesDeCuotas((prev) => [...prev, i]);
    }
  };

  const valCuota = (index: number, opcion: number) =>
    String(Math.ceil((total + total * (0.15 + index * 0.025)) / opcion));

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-[90%] my-2 p-4 rounded-lg ${
          errors.cupo === -1 ? "bg-red-600" : "bg-green-400"
        }`}
      >
        <h4 className="text-xl uppercase text-white text-center">
          Cupo $ {formatWithSeparator(String(datosCredito.cupo))}
        </h4>
      </div>
      <small className="text-red-700 text-sm text-center">
        {errors.cupo === -1 && "El cliente no tiene cupo suficiente"}
      </small>
      <form className="flex flex-col p-4 w-full">
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
                placeholder="000"
                value={datosCredito.cedula}
                onChange={(e) => {
                  getName(e.target.value);
                  setDatosCredito((prev) => ({
                    ...prev,
                    cedula: e.target.value,
                  }));
                }}
              />
              <small className="text-red-600 text-sm">{errors.cedula}</small>
            </div>
            <div className="form-control w-full flex flex-col">
              <label htmlFor="nombres" className="label text-black">
                Nombres
              </label>
              <input
                type="text"
                id="nombres"
                className={`input ${errors.nombres && "input-error"}`}
                placeholder="NN"
                readOnly
                value={datosCredito.nombres}
              />
              <small className="text-red-600 text-sm">{errors.nombres}</small>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="form-control w-full flex flex-col">
              <label htmlFor="periodos" className="label text-black">
                Periodos
              </label>
              <select
                id="periodos"
                className={`select ${errors.periodos && "select-error"}`}
                value={datosCredito.periodos || ""}
                onChange={handlePeriodos}
              >
                <option disabled value="">
                  Selecciona un periodo
                </option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
              <small className="text-red-600 text-sm">{errors.periodos}</small>
            </div>
            <div className="form-control w-full flex flex-col">
              <label htmlFor="diasGracia" className="label text-black">
                Dias de gracia
              </label>
              <input
                type="number"
                id="diasGracias"
                className={`input ${errors.diasGracia && "input-error"}`}
                placeholder="0"
                value={datosCredito.diasGracia}
                min={1}
                max={30}
                onChange={(e) =>
                  setDatosCredito((prev) => ({
                    ...prev,
                    diasGracia: Number(e.target.value),
                  }))
                }
              />
              <small className="text-red-600 text-sm">
                {errors.diasGracia === -1 &&
                  "por favor ingrese los dias de gracia"}
              </small>
            </div>
          </div>
          {opcionesDeCuotas.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <h3 className="text-xl text-black font-bold uppercase">
                opciones de cuota
              </h3>
              <small className="text-red-600 text-sm">
                {errors.numCuotas === -1 && "por favor seleccione las cuotas."}
              </small>
              {opcionesDeCuotas.map((opcion, index) => (
                <label
                  htmlFor={`opCompra${opcion}`}
                  className="label text-black"
                  key={index}
                >
                  <input
                    type="radio"
                    className="radio radio-primary"
                    id={`opCompra${opcion}`}
                    name="opCompra"
                    value={opcion}
                    onChange={(e) => handleCuotas(e, index, opcion)}
                  />
                  <span className="text-lg font-black">
                    {opcion} Cuotas ${" "}
                    {total > 0
                      ? formatWithSeparator(valCuota(index, opcion))
                      : 0}
                  </span>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default DatosCredito;
