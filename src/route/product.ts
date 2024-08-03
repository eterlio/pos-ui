import { RoutesProps } from "@/interfaces/route";
import CreateProductBrandScreen from "@/pages/productBrands/CreateProductBrandScreen";
import ListProductBrandScreen from "@/pages/productBrands/ListProductBrandScreen";
import UpdateProductBrandScreen from "@/pages/productBrands/UpdateProductBrandScreen";
import CreateProductCategoryScreen from "@/pages/productCategories/CreateProductCategoryScreen";
import ListProductCategoriesScreen from "@/pages/productCategories/ListProductCategoriesScreen";
import UpdateProductCategoryScreen from "@/pages/productCategories/UpdateProductCategoryScreen";
import CreateProductCodeScreen from "@/pages/productCodes/CreateProductCodeScreen";
import ListProductCodeScreen from "@/pages/productCodes/ListProductCodesScreen";
import UpdateProductCodeScreen from "@/pages/productCodes/UpdateProductCodeScreen";
import CreateProductUnitScreen from "@/pages/productUnits/CreateProductUnitScreen";
import ListProductUnitsScreen from "@/pages/productUnits/ListProductUnitsScreen";
import UpdateProductUnitScreen from "@/pages/productUnits/UpdateProductUnitScreen";
import CreateProductScreen from "@/pages/products/CreateProductScreen";
import ProductListsScreen from "@/pages/products/ProductListsScreen";
import UpdateProductScreen from "@/pages/products/UpdateProductScreen";

const PRODUCT_ROUTES: RoutesProps[] = [
  {
    component: CreateProductScreen,
    url: "/products/create",
    permission: ["products", "create"],
    requireAuth: true
  },
  {
    component: ProductListsScreen,
    url: "/products",
    permission: ["products", "read"],
    requireAuth: true
  },
  {
    component: UpdateProductScreen,
    url: "/products/:id",
    permission: ["products", "update"],
    requireAuth: true
  }
];
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
const PRODUCT_CODES_ROUTES: RoutesProps[] = [
  {
    component: ListProductCodeScreen,
    url: "/product-codes",
    requireAuth: true,
    permission: ["productCode", "read"]
  },
  {
    component: CreateProductCodeScreen,
    url: "/product-codes/create",
    requireAuth: true,
    permission: ["productCode", "create"]
  },
  {
    component: UpdateProductCodeScreen,
    url: "/product-codes/:id",
    requireAuth: true,
    permission: ["productCode", "update"]
  }
];

export const PRODUCT_ENDPOINTS = [
  ...PRODUCT_ROUTES,
  ...PRODUCT_CATEGORIES_ROUTES,
  ...PRODUCT_BRANDS_ROUTES,
  ...PRODUCT_UNITS_ROUTES,
  ...PRODUCT_CODES_ROUTES
];
