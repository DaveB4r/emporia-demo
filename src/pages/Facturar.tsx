const Facturar = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border border-red-500 h-32 w-full">gi</div>
      <div className="tabs tabs-box w-full">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Contado"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab Contado
        </div>
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Credito"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab Credito
        </div>
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Separado"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab Separado
        </div>
      </div>
    </div>
  );
};
export default Facturar;
