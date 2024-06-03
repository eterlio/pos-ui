import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";
import { useNavigate } from "react-router-dom";

const ListSuppliersScreen = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      pageTitle="Suppliers List"
      actionButton={{
        createButton: { name: "Create Supplier", onClick: () => navigate("/suppliers/create") }
      }}
    >
      <Container>
        <h1>Suppliers List</h1>
      </Container>
    </DashboardLayout>
  );
};

export default ListSuppliersScreen;
