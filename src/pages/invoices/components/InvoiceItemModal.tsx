import Modal from "@/components/Modal";
import SelectField from "@/components/customFields/Select/SelectField";
import InputField from "@/components/customFields/input/InputField";
import NumberField from "@/components/customFields/input/NumberField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { ModalActionButtonProps } from "@/interfaces";
import { FC } from "react";

interface InvoiceItemModalProps {
  showModal: boolean;
  handleShowModal: () => void;
}
const InvoiceItemModal: FC<InvoiceItemModalProps> = ({ handleShowModal, showModal }) => {
  const handleCloseModal = () => {
    handleShowModal();
  };
  const modalData = {
    showModal: showModal,
    modalTitle: "Invoice Item",
    modalDescription: "Fill the inputs to add an invoice item",
    actionButtons: [
      {
        title: "Cancel",
        action: handleCloseModal,
        type: "cancel"
      },
      {
        title: "Add Item",
        action: async () => {},
        type: "action"
      }
    ] as ModalActionButtonProps[]
  };
  const handleFormFieldChange = () => {};
  return (
    <Modal
      modalTitle={modalData.modalTitle}
      modalDescription={modalData.modalDescription}
      showModal={modalData.showModal}
      actionButtons={modalData.actionButtons}
    >
      <SelectField fieldKey="" onChange={handleFormFieldChange} options={[]} label="Product" />
      <NumberField fieldKey="" handleInputChange={handleFormFieldChange} label="Quantity" />
      <NumberField fieldKey="" handleInputChange={handleFormFieldChange} label="Amount" />
      <TextAreaField fieldKey="" handleInputChange={handleFormFieldChange} label="Description" />
    </Modal>
  );
};

export default InvoiceItemModal;
