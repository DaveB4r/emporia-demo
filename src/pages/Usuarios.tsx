import SecretLogin from "../components/usuarios/SecretLogin";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import TableUsuarios from "../components/usuarios/TableUsuarios";

const Usuarios = () => {
  const { state } = useAppContext();
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (state.userSecret === "PabloQuintero:EmporiaSystem2025*")
      setLogged(true);
  }, []);

  useEffect(() => {
    if (logged) {
      fetch("http://localhost:9900/")
        .then((response) => response.json())
        .then((json) => setUsers(json?.data));
    }
  }, [logged]);

  return (
    <div className="min-h-screen min-w-screen bg-base-200 flex justify-center items-center">
      {!logged ? (
        <SecretLogin setLogged={setLogged} />
      ) : (
        <TableUsuarios users={users} />
      )}
    </div>
  );
};

export default Usuarios;
