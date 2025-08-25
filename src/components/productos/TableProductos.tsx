import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import type { IProducto } from "../../interfaces/IProducto";
import { Eye, X } from "lucide-react";
import ModalProducto from "./ModalProducto";

const TableProductos = () => {
  const { state, dispatch } = useAppContext();

  const [id] = useState("modal_producto");
  const [productoSelected, setProductoSelected] = useState<IProducto>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const deleteProducto = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", productId: id });
  };

  const selectProducto = (producto: IProducto) => {
    setProductoSelected(producto);
    (document.getElementById(id) as HTMLFormElement).showModal();
  };

  const columnHelper = createColumnHelper<IProducto>();

  const columns = [
    columnHelper.accessor("referencia", {
      header: "Ref",
      cell: (info) => <b>{info.getValue()}</b>,
    }),
    columnHelper.accessor("imagen", {
      header: "Imagen",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt={info.row.original.nombre}
          className="w-20 h-20 object-cover hidden md:table-cell"
        />
      ),
      enableSorting: false,
    }),
    columnHelper.accessor("nombre", {
      header: "Nombre",
    }),
    columnHelper.accessor("unidades", {
      header: "Unidades",
      cell: (info) => <p className="hidden md:table-cell">{info.getValue()}</p>
    }),
    columnHelper.accessor("precioVenta", {
      header: "Precio Venta",
      cell: (info) => <p className="hidden md:table-cell">$ {info.getValue()}</p>,
    }),
    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      cell: (info) => (
        <div className="flex gap-2">
          <Eye
            className="cursor-pointer text-blue-500"
            onClick={() => selectProducto(info.row.original)}
          />
          <X
            onClick={() => deleteProducto(info.row.original.id)}
            className="cursor-pointer text-red-500"
          />
        </div>
      ),
      enableSorting: false,
    }),
  ].filter(Boolean);

  const table = useReactTable({
    data: state.productos,
    columns: columns as any,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-4" id="table_productos">
      {/* Search bar */}
      <div className="mb-4 float-end">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Buscar producto..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="grow"
          />
        </label>
      </div>
      <table className="table table-zebra">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                    // display:
                    //   header.column.columnDef.header === "Imagen"
                    //     ? "none"
                    //     : header.column.columnDef.header === "Precio Venta"
                    //     ? "none"
                    //     : header.column.columnDef.header === "Unidades"
                    //     ? "none"
                    //     : "table-cell",
                  }}
                  className={header.column.columnDef.header === "Imagen" || header.column.columnDef.header === "Precio Venta" || header.column.columnDef.header === "Unidades" ? "hidden md:table-cell" : ""}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cell.id.includes("imagen") || cell.id.includes("precioVenta") || cell.id.includes("unidades") ? "hidden md:table-cell" : ""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}> No hay productos agregados</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalProducto id={id} producto={productoSelected as IProducto} />
    </div>
  );
};

export default TableProductos;
