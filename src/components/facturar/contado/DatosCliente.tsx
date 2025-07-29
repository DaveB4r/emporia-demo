const DatosCliente = () => {
  return (
    <form className="flex flex-col py-4">
      <fieldset className="fieldset border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend uppercase font-bold text-2xl text-center">
          datos del cliente
        </legend>
        <div className="flex gap-2">
          <div className="form-control w-full">
            <label htmlFor="cedula" className="label text-black">
              Cedula
            </label>
            <input
              type="text"
              id="cedula"
              className="input"
              placeholder="1017455658"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="verificacion" className="label text-black">
              Digito verificacion
            </label>
            <input
              type="number"
              id="verificacion"
              className="input"
              placeholder="2"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-full">
            <label htmlFor="nombre" className="label text-black">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className="input"
              placeholder="John"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="apellido" className="label text-black">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              className="input"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-full">
            <label htmlFor="correo" className="label text-black">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              className="input"
              placeholder="johndoe@mail.co"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="celular" className="label text-black">
              Celular
            </label>
            <input
              type="tel"
              id="celular"
              className="input"
              placeholder="3004158877"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default DatosCliente;
