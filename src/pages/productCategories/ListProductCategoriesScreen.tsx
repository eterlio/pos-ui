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
import { ProductCategoryProps } from "@/interfaces/productCategories";
import { productCategorySchema } from "@/tableSchema/productCategories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ListProductCategoriesScreen = () => {
  const { removeItemFromList } = useOptimisticUpdates();
  const [selectedCategory, setSelectedCategory] = useState<Record<string, any>>({});
  const { queryObject } = useSetQueryParam();
  const { mutate, isPending } = useGeneralMutation<ProductCategoryProps>({
    httpMethod: "delete",
    mutationKey: ["deleteProductCategory", selectedCategory.id],
    url: `/product-categories/${selectedCategory.id}`
  });

  const { data, isFetching } = useGeneralQuery<GetManyProps<ProductCategoryProps>>({
    queryKey: ["productCategories", queryObject],
    url: "/product-categories",
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
        setSelectedCategory(data);
      }
    }
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) => `Are you sure you want to delete  ${name}`,
    modalDescription: `Deleting the product category will permanently remove it from the system. Continue?`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: async () => {
          mutate(selectedCategory.id, {
            onSuccess: () => {
              setOpenModal(false);
              toast.success("Success", {
                description: "Product category deleted"
              });
            },
            onSettled() {
              return removeItemFromList(["productCategories", queryObject], selectedCategory.id);
            }
          });
        },
        type: "action",
        loading: isPending
      }
    ] as ModalActionButtonProps[]
  };

  function handleEditRowActionClick(data: Record<string, any>) {
    navigate(`/product-categories/${data.id}`);
  }

  return (
    <DashboardLayout
      pageTitle="Product Categories"
      actionButton={{
        createButton: {
          name: "Create Product Category",
          onClick: () => navigate("/product-categories/create"),
          disabled: isFetching
        }
      }}
    >
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedCategory.name)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Container className="border border-gray-50">
        <Table
          columns={productCategorySchema}
          data={data?.data || []}
          isLoading={isFetching}
          loadingText="Fetching product category data"
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

export default ListProductCategoriesScreen;
