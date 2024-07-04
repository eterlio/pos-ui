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
import { ProductBrandProps } from "@/interfaces/productBrands";
import { productBrandSchema } from "@/tableSchema/productBrands";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ListProductBrandScreen = () => {
  const { removeItemFromList } = useOptimisticUpdates();
  const [selectedBrand, setSelectedBrand] = useState<Record<string, any>>({});
  const brandId = selectedBrand.id;
  const { queryObject } = useSetQueryParam();
  const { mutate, isPending } = useGeneralMutation<ProductBrandProps>({
    httpMethod: "delete",
    mutationKey: ["deleteProductBrand", brandId],
    url: `/product-brands/${brandId}`
  });

  const { data, isFetching } = useGeneralQuery<GetManyProps<ProductBrandProps>>({
    queryKey: ["productBrands", queryObject],
    url: "/product-brands",
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
        setSelectedBrand(data);
      }
    }
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Deleting the product brand will permanently remove it from the system. Continue?`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: async () => {
          mutate(brandId, {
            onSuccess: () => {
              setOpenModal(false);
              toast.success("Success", {
                description: "Product brand deleted"
              });
            },
            onSettled() {
              return removeItemFromList(["productBrands", queryObject], brandId);
            }
          });
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/product-brands/${data.id}`);
  }

  return (
    <DashboardLayout
      pageTitle="Product Brands"
      actionButton={{
        createButton: {
          name: "Create Product Brand",
          onClick: () => navigate("/product-brands/create"),
          disabled: isFetching
        }
      }}
    >
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedBrand.name)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Container className="border border-gray-50">
        <Table
          columns={productBrandSchema}
          data={data?.data || []}
          isLoading={isFetching}
          loadingText="Fetching product brand data"
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

export default ListProductBrandScreen;
