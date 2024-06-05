import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { productTableSchema } from "@/tableSchema/products";
import { useNavigate } from "react-router-dom";

const ProductListsScreen = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      pageTitle="Products List"
      actionButton={{
        createButton: {
          name: "Create Product",
          onClick: () => navigate("/products/create")
        }
      }}
    >
      <Container className="border border-gray-50">
        <Table columns={productTableSchema} data={[]} allowRowSelect showSelectColumns showExportButton />
      </Container>
    </DashboardLayout>
  );
};

export default ProductListsScreen;
