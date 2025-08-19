const Login = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Prueba nuestra demo!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quisquam vel quasi nihil ipsum corrupti excepturi deleniti amet accusantium facere neque voluptatum at quia, officiis inventore hic necessitatibus libero laborum!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <img src="/images/main-logo.webp" />
              <label className="label">Nombre Completo</label>
              <input type="text" className="input" placeholder="Nombre Completo" />
              <label className="label">Correo</label>
              <input type="email" className="input" placeholder="Correo" />
              <label className="label">Whatsapp</label>
              <input type="tel" className="input" placeholder="Whatsapp" />
              <button className="btn btn-neutral mt-4">Ir a la demostracion</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login