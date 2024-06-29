import { FC } from "react";
import ProductDetail from "./ProductDetail";
import { ProductProps } from "@/interfaces/products";
const ProductDetails: FC<{ products?: ProductProps[] }> = ({ products }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products &&
        products.length > 0 &&
        products.map((product, index) => <ProductDetail product={product} key={index} />)}
    </div>
  );
};
export default ProductDetails;
