import { useState } from "react";

const AddProduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl text-center capitalize p-4 bg-slate-100 w-full rounded-lg font-bold">
        Nuevo producto
      </h3>
      <form className="space-y-4">

      </form>
    </div>
  );
};

export default AddProduct;
