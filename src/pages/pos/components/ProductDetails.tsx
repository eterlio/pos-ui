import { FC } from "react";
import ProductDetail from "./ProductDetail";
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
const ProductDetails: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, index) => (
        <ProductDetail product={product} key={index} />
      ))}
    </div>
  );
};
export default ProductDetails;
