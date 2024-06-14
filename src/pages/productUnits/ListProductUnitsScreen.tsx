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
import { ProductUnitProps } from "@/interfaces/productUnits";
import { productUnitSchema } from "@/tableSchema/productUnits";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ListProductUnitsScreen = () => {
  const { removeItemFromList } = useOptimisticUpdates();
  const [selectedUnit, setSelectedUnit] = useState<Record<string, any>>({});
  const { queryObject } = useSetQueryParam();
  const { mutate, isPending } = useGeneralMutation<ProductUnitProps>({
    httpMethod: "delete",
    mutationKey: ["deleteProductUnit", selectedUnit.id],
    url: `/product-units/${selectedUnit.id}`
  });

  const { data, isFetching } = useGeneralQuery<GetManyProps<ProductUnitProps>>({
    queryKey: ["productUnits", queryObject],
    url: "/product-units",
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
        setSelectedUnit(data);
      }
    }
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Deleting the product unit will permanently remove it from the system. Continue?`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: async () => {
          mutate(selectedUnit.id, {
            onSuccess: () => {
              setOpenModal(false);
              toast.success("Success", {
                description: "Product unit deleted"
              });
            },
            onSettled() {
              return removeItemFromList(["productUnits", queryObject], selectedUnit.id);
            }
          });
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/product-units/${data.id}`);
  }

  return (
    <DashboardLayout
      pageTitle="Product Units"
      actionButton={{
        createButton: { name: "Create Product Unit", onClick: () => navigate("/product-units/create") }
      }}
      isLoading={isFetching}
    >
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedUnit.name)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Container className="border border-gray-50">
        <Table
          columns={productUnitSchema}
          data={data?.data || []}
          isLoading={isFetching}
          loadingText="Fetching product unit data"
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

export default ListProductUnitsScreen;
