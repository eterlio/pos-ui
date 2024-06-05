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
import { ProductProps } from "@/interfaces/products";
import { productTableSchema } from "@/tableSchema/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductListsScreen = () => {
  const { removeItemFromList } = useOptimisticUpdates();
  const [selectedProduct, setSelectedProduct] = useState<Record<string, any>>({});
  const { queryObject } = useSetQueryParam();
  const { mutate, isPending } = useGeneralMutation<ProductProps>({
    httpMethod: "delete",
    mutationKey: ["deleteProduct", selectedProduct.id],
    url: `/products/${selectedProduct.id}`
  });

  const { data, isFetching } = useGeneralQuery<GetManyProps<ProductProps>>({
    queryKey: ["products", queryObject],
    url: "/products",
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
        setSelectedProduct(data);
      }
    }
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Deleting the product will permanently remove it from the system. Continue?`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: async () => {
          mutate(selectedProduct.id, {
            onSuccess: () => {
              setOpenModal(false);
              toast.success("Success", {
                description: "Product deleted"
              });
            },
            onSettled() {
              return removeItemFromList(["products", queryObject], selectedProduct.id);
            }
          });
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/products/${data.id}`);
  }

  return (
    <DashboardLayout
      pageTitle="Products List"
      actionButton={{
        createButton: {
          name: "Create Product",
          onClick: () => navigate("/products/create"),
          loading: isFetching
        }
      }}
    >
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedProduct.name)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Container className="border border-gray-50">
        <Table
          columns={productTableSchema}
          data={data?.data || []}
          paginator={data?.paginator}
          allowRowSelect
          showSelectColumns
          showExportButton
          isLoading={isFetching}
          actionButtons={rowActions}
          handleRowClick={handleEditRowActionClick}
        />
      </Container>
    </DashboardLayout>
  );
};

export default ProductListsScreen;
