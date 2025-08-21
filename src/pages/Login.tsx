import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, type FormEvent } from "react";
import type { IUser } from "../interfaces/IUser";

const initialUser: IUser = {
  nombre: "",
  correo: "",
  celular: "",
};

const Login = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [data, setData] = useState<IUser>(initialUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    <div className="hero bg-base-200 min-h-screen">
      {!loading ? (
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Prueba nuestra demo!</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Temporibus quisquam vel quasi nihil ipsum corrupti excepturi
              deleniti amet accusantium facere neque voluptatum at quia,
              officiis inventore hic necessitatibus libero laborum!
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
                    className="input"
                    placeholder="Nombre Completo"
                    value={data?.nombre}
                    onChange={(e) =>
                      setData((data) => ({ ...data, nombre: e.target.value }))
                    }
                  />
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
                  <button className="btn btn-neutral mt-4" type="submit">
                    Ir a la demostracion
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner text-success loading-xl" />
      )}
    </div>
  );
};

export default Login;
