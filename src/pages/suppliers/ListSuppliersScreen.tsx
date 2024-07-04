import Container from "@/components/Container";
import Modal from "@/components/Modal";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { useOptimisticUpdates } from "@/hooks/request/useOptimisticUpdates";
import { GetManyProps } from "@/hooks/types";
import { useSetQueryParam } from "@/hooks/useSetQueryParam";
import { ModalActionButtonProps } from "@/interfaces";
import { SupplierProps } from "@/interfaces/supplier";
import { suppliersTableSchema } from "@/tableSchema/suppliers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ListSuppliersScreen = () => {
  const { removeItemFromList } = useOptimisticUpdates();
  const [selectedSupplier, setSelectedSupplier] = useState<Record<string, any>>({});
  const { queryObject } = useSetQueryParam();
  const { mutate, isPending } = useGeneralMutation<SupplierProps>({
    httpMethod: "delete",
    mutationKey: ["deleteSupplier", selectedSupplier.id],
    url: `/suppliers/${selectedSupplier.id}`
  });

  const { data, isFetching } = useGeneralQuery<GetManyProps<SupplierProps>>({
    queryKey: ["suppliers", queryObject],
    url: "/suppliers",
    query: queryObject,
    enabled: !!Object.keys(queryObject).length
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const rowActions = [
    {
      label: "Edit",
      action: handleEditRowActionClick
    },
    {
      label: "Delete",
      action: (data: Record<string, any>) => {
        setOpenModal(true);
        setSelectedSupplier(data);
      }
    }
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Deleting the supplier will permanently remove it from the system. Continue?`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: async () => {
          mutate(selectedSupplier.id, {
            onSuccess: () => {
              setOpenModal(false);
              toast.success("Success", {
                description: "Supplier deleted"
              });
            },
            onSettled() {
              return removeItemFromList(["suppliers", queryObject], selectedSupplier.id);
            }
          });
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/suppliers/${data.id}`);
  }

  return (
    <DashboardLayout
      pageTitle="Suppliers"
      actionButton={{
        createButton: { name: "Create Supplier", onClick: () => navigate("/suppliers/create"), disabled: isFetching }
      }}
    >
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedSupplier.name)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Container className="border border-gray-50">
        <Table
          columns={suppliersTableSchema}
          data={data?.data || []}
          isLoading={isFetching}
          loadingText="Fetching supplier data"
          showExportButton
          paginator={data?.paginator}
          filters={[]}
          actionButtons={rowActions}
          allowRowSelect
          handleRowClick={handleEditRowActionClick}
          showSelectColumns
        />
      </Container>
    </DashboardLayout>
  );
};

export default ListSuppliersScreen;
