import AddProduct from "../components/productos/AddProduct";

const Productos = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-[25%] min-h-64">
        <AddProduct />
      </div>
      <div className="w-full md:w-[75%] border-8 border-red-500 min-h-64"></div>
    </div>
  );
};

export default Productos;
