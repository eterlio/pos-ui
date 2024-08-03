import { ReactNode } from "react";
import Container from "../Container";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return <Container className="h-full bg-gray-50 border border-gray-100">{children}</Container>;
};

export default PageContainer;
