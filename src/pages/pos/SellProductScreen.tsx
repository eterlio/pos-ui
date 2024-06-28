import DashboardLayout from "@/components/dashboard/Layout";
import OrderDetails from "./components/OrderDetails";
import CustomField from "@/components/customFields/input/CustomInput";
import { Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";
import ProductDetails from "./components/ProductDetails";
import { useState } from "react";
import Drawer from "@/components/Drawer";
import SelectField from "@/components/customFields/Select/SelectField";
import { Slider } from "@/components/ui/slider";
import PrimaryButton from "@/components/PrimaryButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { uniqueId } from "lodash";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
interface SalesProps {
  customer: string;
  products: Product[];
  discount?: {
    type: "fixed" | "percentage";
    amount: number;
  };
  tax: 0;
  modeOfPayment: "cash" | "mobile money" | "bank";
}
const SellProductScreen = () => {
  const [currentTab, setCurrentTab] = useState("");

  const initialProducts = Array.from({ length: 20 }, (_, i) => ({
    id: uniqueId(),
    name: `Product ${i + 1}`,
    price: 20.0 + i,
    quantity: Math.floor(Math.random() * 2000)
  }));

  // Simulate fetching more products
  const fetchMoreProducts = () => {
    setTimeout(() => {
      setProducts((prev) => {
        console.log(prev);
        return [
          ...prev,
          ...Array.from({ length: 20 }, (_, i) => ({
            id: uniqueId(),
            name: `Product ${prev.length + 1}`,
            price: 20.0 + i,
            quantity: Math.floor(Math.random() * 2000)
          }))
        ];
      });
    }, 1000);
  };
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterShow = () => {
    setShowFilter(true);
  };

  const handleSelectChange = () => {};

  const handlePayItem = () => {};
  const handleItems = () => {};
  return (
    <DashboardLayout showSidebar={false} fullWidth showHeaderSearchBar={false}>
      {/* <Nav></Nav> */}
      <Drawer
        description="Select fields to filter out products base on filter selected"
        position="left"
        title="Filter"
        handleDrawerClose={() => setShowFilter(!showFilter)}
        open={showFilter}
      >
        <div className=" mb-3">
          <SelectField onChange={handleSelectChange} fieldKey="" options={[]} isMulti label="Brand" />
          <SelectField onChange={handleSelectChange} fieldKey="" options={[]} isMulti label="Code" />
          <SelectField onChange={handleSelectChange} fieldKey="" options={[]} isMulti label="Unit" />
          <div className="mt-5">
            <h1>Price Range</h1>
            {/* <div className="flex items-center justify-between bg-red-200">
          <NumberField fieldKey="" handleInputChange={handleSelectChange} label="Min Price"/>
          <span className="flex items-center justify-center w-full h-full"><Minus size={18} strokeWidth={1.5} /></span>
          <NumberField fieldKey="" handleInputChange={handleSelectChange} label="Max Price"/>
        </div> */}
            <div className="flex items-center justify-between my-2">
              <div>
                <p className="text-[12px] font-light">Min</p>
                <span className="text-[12px] font-semibold">0</span>
              </div>
              <div>
                <p className="text-[12px] font-light">Min</p>
                <span className="text-[12px] font-semibold">10,000</span>
              </div>
            </div>
            <Slider defaultValue={[50]} max={10000} step={1} />
            <div className="text-center my-0.5">0</div>
          </div>
        </div>
        <div className="h-full flex flex-col mt-5">
          <div className="my-5 text-center">
            <div className="button-container flex justify-between items-center gap-4">
              <PrimaryButton text="Cancel" variant={"outline"} className="w-full border-primary" onClick={() => {}} />
              <PrimaryButton text="Apply" onClick={() => {}} />
            </div>
          </div>
        </div>
      </Drawer>
      <div className="min-h-screen h-screen">
        <div className="h-full border">
          <section id="products-section" className="products-section md:w-[70%] bg-white p-10 h-full overflow-x-scroll">
            <InfiniteScroll
              dataLength={products.length} //This is important field to render the next data
              next={fetchMoreProducts}
              hasMore={products.length < 120}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollableTarget="products-section"
            >
              <div className="search flex justify-between">
                <div>
                  <h1 className="text-xl font-semibold">POS</h1>
                </div>
                <div className="flex gap-5">
                  <CustomField
                    handleInputChange={() => {}}
                    fieldKey=""
                    type="text"
                    icon={{ element: Search, position: "left", show: true, className: "bg-transparent" }}
                    placeholder="Search"
                    className="bg-gray-50 flex-1 w-full"
                  />
                  <Button
                    className="filter shadow w-[50px] h-10 rounded flex items-center justify-center text-gray-600 bg-white hover:text-white"
                    onClick={handleFilterShow}
                  >
                    <Settings2 size={20} />
                  </Button>
                </div>
              </div>

              <div className="products">
                <div>
                  <Tabs getActiveTab={(tab) => setCurrentTab(tab.value)}>
                    <Tab label="Tiles" value="tiles">
                      <div className="py-4">
                        <ProductDetails products={products} />
                      </div>
                    </Tab>
                    <Tab label="Doors" value="doors">
                      <div className="py-4">
                        <ProductDetails products={products} />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </InfiniteScroll>
          </section>
          <OrderDetails />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellProductScreen;
