import SelectField from "@/components/customFields/Select/SelectField";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import usePosStore from "@/store/usePosStore";
import { Plus } from "lucide-react";
import Modal from "@/components/Modal";
import { ModalActionButtonProps } from "@/interfaces";
import { useState } from "react";
import InputField from "@/components/customFields/input/InputField";
import PhoneInputField from "@/components/customFields/input/Phone";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { CustomerProps } from "@/interfaces/customer";
import { GetManyProps } from "@/hooks/types";
import { defaultCustomer } from "@/defaults";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { HandlerProps } from "@/components/customFields/type";
import { objectDifference } from "@/helpers";
import { GENDER_OPTIONS } from "@/utils";

const OrderDetails = () => {
  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(defaultCustomer());
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const { items, getItemTotalAmount, getTotalItems } = usePosStore();
  const totalAmount = getItemTotalAmount();
  const totalItems = getTotalItems();

  const { isPending, mutate } = useGeneralMutation<CustomerProps>({
    httpMethod: "post",
    mutationKey: ["createCustomer"],
    url: "/customers"
  });

  const { refetch, data: customers } = useGeneralQuery<GetManyProps<CustomerProps>>({
    queryKey: ["createCustomers"],
    url: "/customers",
    enabled: true,
    query: { deleted: false }
  });

  const payload = objectDifference(defaultCustomer(), formValues) as CustomerProps;
  const modalData = {
    showModal: openCustomerModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Fill the form to create a new customer.`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenCustomerModal(false),
        type: "cancel",
        disabled: isPending
      },
      {
        title: "Create customer",
        action: () => {
          mutate(
            { payload },
            {
              onSuccess() {
                setOpenCustomerModal(false);
                refetch({ throwOnError: true });
                setFormValues(defaultCustomer());
              }
            }
          );
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  const customerOptions =
    customers?.data.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer._id
      };
    }) || [];
  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    updateFormFieldValue(key, value);
  };
  return (
    <>
      <Modal
        showModal={modalData.showModal}
        modalTitle={"Create customer"}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      >
        <div>
          <InputField
            fieldKey="firstName"
            handleInputChange={handleFieldChange}
            label="First name"
            isRequired
            value={formValues?.firstName}
          />
          <InputField
            fieldKey="lastName"
            handleInputChange={handleFieldChange}
            label="Last name"
            isRequired
            value={formValues?.lastName}
          />
          <InputField fieldKey="email" handleInputChange={handleFieldChange} label="Email" value={formValues?.email} />
          <SelectField
            fieldKey="gender"
            onChange={handleFieldChange}
            label="Gender"
            selectValue={formValues?.gender}
            options={GENDER_OPTIONS}
          />
          <PhoneInputField
            fieldKey="phone"
            handleInputChange={handleFieldChange}
            label="Phone"
            isRequired
            value={formValues?.phone}
          />
        </div>
      </Modal>
      <aside className="order-details__section md:w-[30%] border-l border-l-gray-300  bg-white p-2 flex flex-col overflow-hidden md:fixed right-0 bottom-0 top-0 mt-8">
        <div className="my-4">
          <div className="flex border-t border-t-gray-300">
            <h1 className="text-xl">Order Details</h1>
          </div>
          <div className="flex items-end gap-4 justify-between">
            <div className="flex-1">
              <SelectField
                fieldKey="customerId"
                label={"Customer Name"}
                onChange={() => {}}
                options={customerOptions}
              />
            </div>
            <div>
              <Button size={"icon"} onClick={() => setOpenCustomerModal(true)}>
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <OrderItems items={items} />
        <div className="flex-1 h-full flex flex-col justify-end">
          <OrderSummary totalItems={totalItems} totalItemAmount={totalAmount} />
          <div className="pay-button mb-3 flex items-center gap-4">
            <Button className="w-full flex gap-2 items-center" disabled={totalAmount === 0}>
              <span>Pay</span>
              <span>&#8373;{totalAmount.toFixed(2)}</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default OrderDetails;
