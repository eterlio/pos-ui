import ProductDetail from "./ProductDetail";
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
const ProductDetails = () => {
  const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 20.0 + i,
    quantity: Math.floor(Math.random() * 2000)
  }));
  console.log(products);
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, index) => {
        return <ProductDetail product={product} key={index} />;
      })}
    </div>
  );
};

export default ProductDetails;
