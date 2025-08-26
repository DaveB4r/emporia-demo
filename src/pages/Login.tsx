import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, type FormEvent } from "react";
import type { IUser } from "../interfaces/IUser";
import { CircleQuestionMark } from "lucide-react";

const initialUser: IUser = {
  nombre: "",
  correo: "",
  celular: "",
};

const Login = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [data, setData] = useState<IUser>(initialUser);
  const [errors, setErrors] = useState<IUser>(initialUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setErrors(initialUser);
    if (!data.nombre) {
      setErrors((prev) => ({
        ...prev,
        nombre: "Por favor indique su nombre completo!",
      }));
      return;
    }
    if (data.nombre.length < 3) {
      setErrors((prev) => ({
        ...prev,
        nombre: "Por favor indique un nombre valido!",
      }));
      return;
    }
    if(!data.correo) {
      setErrors((prev) => ({
        ...prev,
        correo: "Por favor indique su correo!"
      }));
      return;
    }
    if(!emailRegex.test(data.correo)) {
      setErrors((prev) => ({
        ...prev,
        correo: "Por favor indique un correo valido!"
      }));
      return;
    }
    if(!data.celular) {
      setErrors((prev) => ({
        ...prev,
        celular: "Por favor indique su numero de celular!"
      }));
      return;
    }
    if(data.celular.length < 10) {
      setErrors((prev) => ({
        ...prev,
        celular: "Por favor indique un numero de celular valido!"
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:9900/insert-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ ...data }),
      });
      const userInfo = await response.json();
      setLoading(false);
      setData(initialUser);
      dispatch({ type: "LOGIN", userId: userInfo?.id });
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen relative">
      {!loading ? (
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-5xl font-bold capitalize text-blue-950">
              ¡Prueba nuestra demo!
            </h1>
            <p className="py-6 text-lg md:text-2xl font-semibold">
              La gestión de tu negocio, simplificada. <br />
              Bienvenido a lo que estamos construyendo para ti.
            </p>
            <p className="text-lg md:text-2xl font-semibold text-blue-950">
              <b className="text-xl md:text-3xl">Software ERP:</b> Facturación,
              Inventario, CRM, seguimiento de cartera, ventas a Crédito,
              Automatización sms, correos y llamadas… y mucho mas
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <img src="/images/main-logo.webp" alt="logo" />
                  <label htmlFor="nombre" className="label">
                    Nombre Completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className={`input ${errors.nombre && "input-error"}`}
                    placeholder="Nombre Completo"
                    value={data?.nombre}
                    onChange={(e) =>
                      setData((data) => ({ ...data, nombre: e.target.value }))
                    }
                  />
                  <small className="text-xs text-red-700">
                    {errors.nombre}
                  </small>
                  <label htmlFor="correo" className="label">
                    Correo
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className="input"
                    placeholder="Correo"
                    value={data.correo}
                    onChange={(e) =>
                      setData((data) => ({ ...data, correo: e.target.value }))
                    }
                  />
                  <small className="text-xs text-red-700">
                    {errors.correo}
                  </small>
                  <label htmlFor="celular" className="label">
                    Celular
                  </label>
                  <input
                    id="celular"
                    type="tel"
                    className="input"
                    placeholder="Celular"
                    value={data.celular}
                    onChange={(e) =>
                      setData((data) => ({ ...data, celular: e.target.value }))
                    }
                  />
                  <small className="text-xs text-red-700">
                    {errors.celular}
                  </small>
                  <button className="btn btn-neutral mt-4" type="submit">
                    Ir a la demostracion
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="absolute bottom-5 right-5">
            <Link to="/usuarios"><CircleQuestionMark className="cursor-pointer hover:scale-105"/></Link>
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner text-success loading-xl" />
      )}
    </div>
  );
};

export default Login;
