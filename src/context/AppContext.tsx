import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { IProducto } from "../interfaces/IProducto";

type ActionType =
  | { type: "ADD_PRODUCT"; producto: IProducto }
  | { type: "DELETE_PRODUCT"; productId: string }
  | { type: "LOGIN"; userId: string }
  | { type: "LOGOUT" }
  | { type: "LOGIN_SECRET"; userSecret: string };

type State = {
  productos: IProducto[];
  userId: string;
  userSecret: string;
};

const initialState: State = {
  productos: [],
  userId: localStorage.getItem("userId") as string,
  userSecret: localStorage.getItem("userSecret") as string,
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
    case "LOGIN":
      localStorage.removeItem("userId");
      localStorage.setItem("userId", action.userId);
      return {
        ...state,
        userId: localStorage.getItem("userId") as string,
      };
    case "LOGOUT":
      localStorage.removeItem("userId");
      return initialState;
    case "LOGIN_SECRET":
      localStorage.setItem("userSecret", action.userSecret);
      return {
        ...state,
        userSecret: localStorage.getItem("userSecret") as string,
      };
    default:
      return state;
  }
};
type AppContextType = {
  state: State;
  dispatch: Dispatch<ActionType>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UseAppContext must be used within AppProvider");
  }
  return context;
};
