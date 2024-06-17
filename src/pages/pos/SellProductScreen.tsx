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
const SellProductScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const handleFilterShow = () => {
    setShowFilter(true);
  };
  return (
    <DashboardLayout showSidebar={false} fullWidth>
      <Drawer
        description=""
        position="left"
        title="Filter"
        handleDrawerClose={() => setShowFilter(!showFilter)}
        open={showFilter}
      >
        <h1 className="bg-red-200">Hello</h1>
      </Drawer>
      <div className="min-h-screen h-screen overflow-hidden">
        <div className="flex justify-between h-full border">
          <section className="products-section w-[70%] bg-white p-10">
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
                <Tabs>
                  <Tab label="Tiles">
                    <div className="py-4">
                      <ProductDetails />
                    </div>
                  </Tab>
                  <Tab label="Doors">
                    <div className="py-4">
                      <ProductDetails />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </section>
          <OrderDetails />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellProductScreen;
