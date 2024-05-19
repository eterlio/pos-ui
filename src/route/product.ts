import { RoutesProps } from "@/interfaces/route";
import CreateProductBrandScreen from "@/pages/productBrand/CreateProductBrandScreen";
import ListProductBrandScreen from "@/pages/productBrand/ListProductBrandScreen";
import UpdateProductBrandScreen from "@/pages/productBrand/UpdateProductBrandScreen";
import CreateProductCategoryScreen from "@/pages/productCategories/CreateProductCategoryScreen";
import ListProductCategoriesScreen from "@/pages/productCategories/ListProductCategoriesScreen";
import UpdateProductCategoryScreen from "@/pages/productCategories/UpdateProductCategoryScreen";
import CreateProductUnitScreen from "@/pages/productUnits/CreateProductUnitScreen";
import ListProductUnitsScreen from "@/pages/productUnits/ListProductUnitsScreen";
import UpdateProductUnitScreen from "@/pages/productUnits/UpdateProductUnitScreen";
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
const PRODUCT_BRANDS_ROUTES: RoutesProps[] = [
  {
    component: ListProductBrandScreen,
    url: "/product-brands",
    requireAuth: true,
    permission: ["productBrand", "read"]
  },
  {
    component: CreateProductBrandScreen,
    url: "/product-brands/create",
    requireAuth: true,
    permission: ["productBrand", "create"]
  },
  {
    component: UpdateProductBrandScreen,
    url: "/product-brands/:id",
    requireAuth: true,
    permission: ["productBrand", "update"]
  }
];
const PRODUCT_UNITS_ROUTES: RoutesProps[] = [
  {
    component: ListProductUnitsScreen,
    url: "/product-units",
    requireAuth: true,
    permission: ["productUnit", "read"]
  },
  {
    component: CreateProductUnitScreen,
    url: "/product-units/create",
    requireAuth: true,
    permission: ["productUnit", "create"]
  },
  {
    component: UpdateProductUnitScreen,
    url: "/product-units/:id",
    requireAuth: true,
    permission: ["productUnit", "update"]
  }
];

export const PRODUCT_ENDPOINTS = [...PRODUCT_CATEGORIES_ROUTES, ...PRODUCT_BRANDS_ROUTES, ...PRODUCT_UNITS_ROUTES];
