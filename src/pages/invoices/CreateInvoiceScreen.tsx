import SelectField from "@/components/customFields/Select/SelectField";
import DatePicker from "@/components/customFields/date/DatePicker";
import DashboardLayout from "@/components/dashboard/Layout";
import PageContainer from "@/components/dashboard/PageContainer";
import { Button } from "@/components/ui/button";
import { PencilLine, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import InvoiceItemModal from "./components/InvoiceItemModal";
import InvoiceItemHeader from "./components/InvoiceItemHeader";
import InvoiceItem from "./components/InvoiceItem";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import NumberField from "@/components/customFields/input/NumberField";

const CreateInvoiceScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowAddItemModal = () => {
    setShowModal(!showModal);
  };
  return (
    <DashboardLayout pageTitle="New invoice">
      <PageContainer>
        <div className="invoice-number">
          <h1 className="text-3xl">Invoice #00001234</h1>
        </div>
        <div className="flex items-center justify-end">
          <div className="w-1/3">
            <SelectField options={[]} fieldKey="" label="Customer" />
          </div>
        </div>
        <div className="flex items-center justify-between relative">
          <div className="relative">
            <p className="text-gray-500 text-sm">BILLING FROM</p>
            <h1 className="text-2x font-medium">Oseikrom Hardware Enterprise</h1>
            <span className="text-xs">admin@oseikrom.com</span>
            <div className="my-7 text-sm">
              <p>P.O BOX 34, Agona Swdru</p>
              <p>Akwamkurom</p>
              <p>(233) 543814868</p>
              <Link to="" className="font-bold text-primary my-3 flex items-center gap-x-1">
                <span>
                  <PencilLine size={18} />
                </span>
                <span>Edit Info</span>
              </Link>
            </div>
          </div>
          <div className="absolute border-r h-full bg-red-50 left-1/2"></div>
          <div className="relative">
            <p className="text-gray-500 text-sm">BILLING TO</p>
            <h1 className="text-2x font-medium">Oseikrom Hardware Enterprise</h1>
            <span className="text-xs">admin@oseikrom.com</span>
            <div className="my-7 text-sm">
              <p>P.O BOX 34, Agona Swdru</p>
              <p>Akwamkurom</p>
              <p>(233) 543814868</p>
              <Link to="" className="font-bold text-primary my-3 flex items-center gap-x-1">
                <span>
                  <PencilLine size={18} />
                </span>
                <span>Edit Info</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-[40%] flex justify-between gap-x-4">
            <div className="flex-1">
              <DatePicker fieldKey="" label="Invoice Date" />
            </div>
            <div className="flex-1">
              <DatePicker fieldKey="" label="Payment Due" />
            </div>
          </div>
        </div>

        <div className="recurring_container flex items-center justify-between gap-x-5">
          <div className="flex-1">
            <CheckBoxField fieldKey="" label="Is invoice recurring?" />
          </div>
          <div className="flex-1">
            <SelectField options={[]} label="Frequency" fieldKey="" />
          </div>
          <div className="flex-1">
            <NumberField fieldKey="" handleInputChange={() => {}} label="Interval" />
          </div>
          <div className="flex-1">
            <NumberField fieldKey="" handleInputChange={() => {}} label="Cycle" />
          </div>
        </div>
        <div className="items-container my-10 border py-5 px-10 space-y-5">
          <h1 className="font-medium">Invoice Details</h1>
          <InvoiceItemHeader />
          <InvoiceItem item={{ amount: 20, item: "Product I", quantity: 2 }} />
          <InvoiceItem item={{ amount: 20, item: "Product I", quantity: 2 }} />
          <InvoiceItem item={{ amount: 20, item: "Product I", quantity: 2 }} />
          <InvoiceItem item={{ amount: 20, item: "Product I", quantity: 2 }} />
        </div>
        <div className="add_item_container flex justify-end">
          <Button variant={"link"} className="font-bold" onClick={handleShowAddItemModal}>
            <span>
              <Plus size={16} />
            </span>
            <span>Add item</span>
          </Button>
        </div>

        <div className="my-5">
          <TextAreaField fieldKey="" handleInputChange={() => {}} label={"Invoice Description"} />
        </div>
        <div className="invoice-summary"></div>
        {showModal && <InvoiceItemModal handleShowModal={handleShowAddItemModal} showModal={showModal} />}
      </PageContainer>
    </DashboardLayout>
  );
};

export default CreateInvoiceScreen;
