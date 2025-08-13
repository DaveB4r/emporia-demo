import type { Dispatch } from "react";
import type { IProducto } from "../interfaces/IProducto";

type ActionType =
  | { type: "ADD_PRODUCT"; producto: IProducto }
  | { type: "DELETE_PRODUCT"; productId: string };

type State = {
  productos: IProducto[];
};

const initialState: State = {
  productos: [],
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, productos: [...state.productos, action.producto] };
    case "DELETE_PRODUCT":
      return {
        ...state,
        productos: state.productos.filter((p) => p.id !== action.productId),
      };
    default:
      return state;
  }
  type AppContextType = {
    state: State;
    dispatch: Dispatch<ActionType>;
  };
};
