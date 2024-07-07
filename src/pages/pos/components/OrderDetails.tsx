import SelectField from "@/components/customFields/Select/SelectField";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import usePosStore, { initialState } from "@/store/usePosStore";
import { Plus } from "lucide-react";
import Modal from "@/components/Modal";
import { ModalActionButtonProps, OptionsProps } from "@/interfaces";
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
import { formatCurrency, objectDifference } from "@/helpers";
import { GENDER_OPTIONS, printPDF } from "@/utils";
import PayNowModal from "./PayNowModal";
import { pick } from "lodash";
import { toast } from "sonner";

type ModalType = "payment" | "customer";
type ModalObjectMapperProps = {
  [key in ModalType]: {
    description: string;
    title: string;
    buttonTitle: string;
    action: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
};

const OrderDetails = () => {
  const { formValues, updateFormFieldValue, setFormValues } = useFormFieldUpdate(defaultCustomer());
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("customer");
  const { items, getItemTotalAmount, getTotalItems, setState, getState, resetState } = usePosStore();
  const totalAmount = getItemTotalAmount();
  const totalItems = getTotalItems();
  const { isPending: makeSalesRequest, mutate: salesMutation } = useGeneralMutation<string>({
    httpMethod: "post",
    mutationKey: ["createSales"],
    url: "/sales"
  });
  const { isPending, mutate } = useGeneralMutation<CustomerProps>({
    httpMethod: "post",
    mutationKey: ["createCustomer"],
    url: "/customers"
  });

  const modalObjectMapper: ModalObjectMapperProps = {
    payment: {
      description: "Fill the form to complete the sale",
      title: "Make Payment",
      buttonTitle: "Make Payment",
      disabled: !getState().amountPaid || makeSalesRequest,
      loading: makeSalesRequest,
      action: () => {
        const data = pick(getState(), [
          "amountPaid",
          "bankPayment",
          "chequePayment",
          "customerId",
          "discount",
          "items",
          "modeOfPayment",
          "mobileMoneyPayment",
          "tax"
        ]);
        const payload: any = objectDifference(initialState, data);
        if (!payload.modeOfPayment) {
          payload.modeOfPayment = "cash";
        }

        salesMutation(
          { payload },
          {
            async onSuccess(data) {
              setOpenModal(false);
              resetState();
              printPDF(data?.data?.response);
              toast.success("Success", {
                description: "Sales recorded"
              });
            }
          }
        );
      }
    },
    customer: {
      description: "Fill the form to create a new customer.",
      title: "Create Customer",
      buttonTitle: "Create Customer",
      action: () => {
        mutate(
          { payload },
          {
            onSuccess() {
              setOpenModal(false);
              refetch({ throwOnError: true });
              setFormValues(defaultCustomer());
            }
          }
        );
      }
    }
  };

  const { refetch, data: customers } = useGeneralQuery<GetManyProps<CustomerProps>>({
    queryKey: ["createCustomers"],
    url: "/customers",
    enabled: true,
    query: { deleted: false }
  });

  const payload = objectDifference(defaultCustomer(), formValues) as CustomerProps;
  const modalData = {
    showModal: openModal,
    modalDescription: modalObjectMapper[modalType].description,
    title: modalObjectMapper[modalType].title,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel",
        disabled: isPending
      },
      {
        title: modalObjectMapper[modalType].buttonTitle,
        action: modalObjectMapper[modalType].action,
        type: "action",
        loading: modalObjectMapper[modalType].loading,
        disabled: modalObjectMapper[modalType].disabled
      }
    ] as ModalActionButtonProps[]
  };

  const customerOptions: OptionsProps[] =
    customers?.data.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer._id || ""
      };
    }) || [];
  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    updateFormFieldValue(key, value);
  };

  const handleCustomerChange = (data: HandlerProps) => {
    const { value } = data;
    setState({ customerId: value });
  };

  const handleModalChange = (type: ModalType) => {
    return () => {
      setModalType(type);
      setOpenModal(true);
    };
  };
  const handleHoldProducts = () => {
    alert("This feature will be out soon");
  };
  return (
    <>
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.title}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      >
        {modalType === "customer" && (
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
            <InputField
              fieldKey="email"
              handleInputChange={handleFieldChange}
              label="Email"
              value={formValues?.email}
            />
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
        )}
        {modalType === "payment" && <PayNowModal customers={customerOptions} />}
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
                onChange={handleCustomerChange}
                options={customerOptions}
                selectValue={getState().customerId}
              />
            </div>
            <div>
              <Button size={"icon"} onClick={handleModalChange("customer")}>
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <OrderItems items={items} />
        <div className="flex-1 h-full flex flex-col justify-end">
          <OrderSummary totalItems={totalItems} totalItemAmount={totalAmount} />
          <div className="pay-button mb-3 flex items-center gap-4">
            <Button
              variant={"outline"}
              className="w-full flex gap-2 items-center"
              disabled={totalAmount === 0}
              onClick={handleHoldProducts}
            >
              <span>Hold</span>
            </Button>
            <Button
              className="w-full flex gap-2 items-center"
              disabled={totalAmount === 0}
              onClick={handleModalChange("payment")}
            >
              <span>Pay</span>
              <span>{formatCurrency({ value: totalAmount })}</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default OrderDetails;
