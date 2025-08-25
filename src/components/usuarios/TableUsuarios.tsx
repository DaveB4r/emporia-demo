import { Link } from "react-router-dom";

type Props = {
  users: any[];
};

const TableUsuarios = ({ users }: Props) => {
  return (
    <div className="overflow-x-auto self-start">
      <img src="/images/main-logo.webp" alt="logo" width={500} />
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="hidden md:table-cell">Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Celular</th>
            <th className="hidden md:table-cell">Fecha Creacion</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user?.id}>
                <td className="hidden md:table-cell">{user?.id}</td>
                <td>{user?.nombre}</td>
                <td>{user?.correo}</td>
                <td className="text-red-600 font-black">
                  <a href={`tel:+${user?.celular}`}>{user?.celular}</a>
                </td>
                <td className="hidden md:table-cell">{user?.created_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/" className="mt-4 float-end btn btn-neutral">Volver</Link>
    </div>
  );
};

export default TableUsuarios;
