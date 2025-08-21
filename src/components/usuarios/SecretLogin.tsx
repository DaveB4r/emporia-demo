import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

type Props = {
  setLogged: Dispatch<SetStateAction<boolean>>;
};
import { useAppContext } from "../../context/AppContext";

const SecretLogin = ({ setLogged }: Props) => {
  const { dispatch } = useAppContext();
  const [data, setData] = useState({ usuario: "", pass: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      data.usuario === "PabloQuintero" &&
      data.pass === "EmporiaSystem2025*"
    ) {
      dispatch({
        type: "LOGIN_SECRET",
        userSecret: `${data.usuario}:${data.pass}`,
      });
      setLogged(true);
    }
    setError("Datos invalidos, por favor intente nuevamente");
  };

  return (
    <div className="w-96 border border-gray-300 rounded-lg p-4">
      <small className="text-sm text-red-600">{error}</small>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <img src="/images/main-logo.webp" alt="logo" />
          <label htmlFor="usuario">
            <b>Usuario *</b>
          </label>
          <input
            type="text"
            id="usuario"
            className={`input ${error && "input-error"}`}
            placeholder="Usuario"
            value={data.usuario}
            onChange={(e) =>
              setData((data) => ({ ...data, usuario: e.target.value }))
            }
          />
          <label htmlFor="pass">
            <b>Contraseña</b>
          </label>
          <input
            type="password"
            id="pass"
            className={`input ${error && "input-error"}`}
            placeholder="Contraseña"
            value={data.pass}
            onChange={(e) =>
              setData((data) => ({ ...data, pass: e.target.value }))
            }
          />
          <button className="btn btn-neutral" type="submit">
            Enviar
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SecretLogin;
