import { RoutesProps } from "@/interfaces/route";
import CreateProductCategoryScreen from "@/pages/productCategories/CreateProductCategoryScreen";
import ListProductCategoriesScreen from "@/pages/productCategories/ListProductCategoriesScreen";
import UpdateProductCategoryScreen from "@/pages/productCategories/UpdateProductCategoryScreen";
const PRODUCT_CATEGORIES_ROUTES: RoutesProps[] = [
  {
    component: ListProductCategoriesScreen,
    url: "/product-categories",
    requireAuth: true,
    permission: ["productCategory", "read"]
  },
  {
    component: CreateProductCategoryScreen,
    url: "/product-categories/create",
    requireAuth: true,
    permission: ["productCategory", "create"]
  },
  {
    component: UpdateProductCategoryScreen,
    url: "/product-categories/:id",
    requireAuth: true,
    permission: ["productCategory", "update"]
  }
];

export const PRODUCT_ENDPOINTS = [...PRODUCT_CATEGORIES_ROUTES];
