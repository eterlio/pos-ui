import { Plus } from "lucide-react";
import Tile from "@/assets/tile.jpg";
import { Button } from "@/components/ui/button";
import { FC } from "react";
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
const ProductDetail: FC<{ product: Product }> = ({ product }) => {
  const { name, price, quantity } = product;
  return (
    <div className="min-h-[200px] h-[300px] p-2 flex flex-col shadow border rounded-md relative">
      <div className="product-image flex-1 mb-4 h-1/2">
        <img src={Tile} alt="" className="h-full w-full rounded-md" />
      </div>
      <div className="product-content flex-1">
        <p className="title text-sm">{name}</p>
        <h1 className="price font-semibold mt-2">&#8373;{price.toFixed(2)}</h1>
      </div>
      <div className="flex flex-1 my-2 items-center justify-end">
        <Button
          size={"icon"}
          className="flex bg-gray-100 text-primary items-center justify-center rounded-md hover:bg-gray-200"
        >
          <Plus size={18} />
        </Button>
      </div>
      <div className="absolute bottom-0 left-2 text-[11px]">{quantity}</div>
    </div>
  );
};

export default ProductDetail;
