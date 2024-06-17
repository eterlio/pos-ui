import ProductDetail from "./ProductDetail";

const ProductDetails = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      <ProductDetail />
      <ProductDetail />
      <ProductDetail />
      <ProductDetail />
    </div>
  );
};

export default ProductDetails;
