import { create } from "zustand";
import useProductStore from "./useProductStore";

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
  incrementItemQuantity: (id: string, quantity: number) => void;
  decrementItemQuantity: (id: string, quantity: number) => void;
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
  addItem: (item) => {
    const { decrementProductQuantity, getProductById } = useProductStore.getState();

    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      const product = getProductById(item.id);

      if (product && product.productQuantity) {
        decrementProductQuantity(item.id, item.quantity);
      }

      if (existingItem) {
        // Item already exists, update quantity
        const updatedItems = state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
        return { ...state, items: updatedItems };
      } else {
        // Item does not exist, add it to the list
        return { ...state, items: [...state.items, item] };
      }
    });
  },
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
  },
  incrementItemQuantity: (id, amount) => {
    const { decrementProductQuantity } = useProductStore.getState();

    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      );
      decrementProductQuantity(id, amount);
      return { ...state, items: updatedItems };
    });
  },
  decrementItemQuantity: (id, amount) => {
    const { incrementProductQuantity } = useProductStore.getState();

    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - amount } : item
      );
      incrementProductQuantity(id, amount);
      return { ...state, items: updatedItems };
    });
  }
}));

export default usePosStore;
