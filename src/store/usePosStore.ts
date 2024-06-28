import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SalesProps {
  customer: string;
  items: Product[];
  discount?: {
    type: "fixed" | "percentage";
    amount: number;
  };
  tax: number;
  modeOfPayment?: "cash" | "mobile money" | "bank";
}

// Define the state type
type State = SalesProps;

// Define the actions type
type Action = {
  addItem: (product: Product) => void;
  updateItem: (id: string, productData: Partial<Product>) => void;
  updateItems: (products: Product[]) => void;
  removeItem: (id: string) => void;
  removeItems: () => void;
  getItemTotalAmount: () => number;
  getTotalItems: () => number;
};

// Initial state
const initialState: State = {
  customer: "",
  items: [],
  tax: 0,
  modeOfPayment: undefined,
  discount: undefined
};

// Create the Zustand store
const usePosStore = create<State & Action>()((set, get) => ({
  ...initialState,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // Item already exists, update quantity
        const updatedItems = state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
        return { ...state, items: updatedItems };
      } else {
        // Item does not exist, add it to the list
        return { ...state, items: [...state.items, item] };
      }
    }),
  updateItem: (id, productData) =>
    set((state) => {
      const updatedItems = state.items.map((p) => (p.id === id ? { ...p, ...productData } : p));
      return { ...state, items: updatedItems };
    }),
  updateItems: (items) => set(() => ({ items })),
  removeItem: (id) =>
    set((state) => {
      const filteredProducts = state.items.filter((p) => p.id !== id);
      return { ...state, items: filteredProducts };
    }),
  removeItems: () => set(() => ({ items: [] })),
  getItemTotalAmount: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));

export default usePosStore;
