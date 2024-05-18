import {
  ArrowRightLeft,
  Box,
  Calculator,
  LayoutDashboard,
  NotebookText,
  ScanSearch,
  SettingsIcon,
  Tags,
  Truck,
  UserPlus,
  UsersIcon,
  MinusCircle,
  Puzzle
} from "lucide-react";

interface RouteLink {
  title: string;
  url: string;
  isVisible?: boolean;
  isDisabled?: boolean;
}

export interface SubLink extends RouteLink {}

export interface MenuSidebarRoute extends RouteLink {
  icon?: any;
  subLinks?: SubLink[];
}

export interface MenuSidebarRoutes {
  title: string;
  routeLinks: MenuSidebarRoute[];
}
export const menuSidebarRoutes = (userRole?: string): MenuSidebarRoutes => ({
  title: "Menu",
  routeLinks: [
    {
      title: "Dashboard",
      url: `/dashboard/${userRole}`,
      icon: LayoutDashboard
    },
    {
      title: "Users",
      url: "/",
      icon: UsersIcon,
      subLinks: [
        {
          title: "Create users",
          url: "/users/create"
        },

        {
          title: "List users",
          url: "/users"
        }
      ]
    },
    {
      title: "Products",
      url: "/",
      icon: Tags,
      isDisabled: false,
      subLinks: [
        {
          title: "Add Product",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Import Products",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Print Barcode/QrCode",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Product Categories",
          url: "/product-categories"
        },
        {
          title: "Product Brands",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Product Units",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Product Variations",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Product Warrants",
          url: "/users",
          isDisabled: true
        },
        {
          title: "Product Alert",
          url: "/users",
          isDisabled: true
        }
      ]
    },
    {
      title: "Stock Adjustment",
      url: "/",
      icon: Box,
      isDisabled: true,
      subLinks: [
        {
          title: "Stock List",
          url: "/users"
        },
        {
          title: "Product Stock List",
          url: "/users"
        },
        {
          title: "Product stock adjustment",
          url: "/users"
        }
      ]
    },
    {
      title: "Stock Transfer",
      url: "/",
      icon: ArrowRightLeft,
      isVisible: false,
      isDisabled: true,
      subLinks: [
        {
          title: "List stock transfers",
          url: "/users/create"
        },
        {
          title: "Add stock transfers",
          url: "/users/create"
        },
        {
          title: "Received transfers",
          url: "/users/create"
        }
      ]
    },
    {
      title: "Customer",
      url: "/",
      icon: UserPlus,
      isDisabled: true
    },
    {
      title: "Supplier",
      url: "/",
      icon: Truck,
      isDisabled: true
    },

    {
      title: "Accounting",
      url: "/",
      icon: Calculator,
      isDisabled: true,
      subLinks: [
        {
          title: "Profit/Loss",
          url: "/users/create"
        },

        {
          title: "Income/Expense",
          url: "/users"
        }
      ]
    },
    {
      title: "Installments",
      url: "/",
      icon: Puzzle,
      isDisabled: true,
      subLinks: [
        {
          title: "Profit/Loss",
          url: "/users/create"
        },

        {
          title: "Income/Expense",
          url: "/users"
        }
      ]
    },
    {
      title: "Expenditure",
      url: "/",
      icon: MinusCircle,
      isDisabled: true,
      subLinks: [
        {
          title: "Add Expense",
          url: "/users/create"
        },

        {
          title: "Expense List",
          url: "/users"
        },
        {
          title: "Add Category",
          url: "/users"
        },
        {
          title: "Category List",
          url: "/users"
        },
        {
          title: "Summary",
          url: "/users"
        }
      ]
    },
    {
      title: "Analytics",
      url: "/",
      icon: ScanSearch,
      isDisabled: true
    },
    {
      title: "Reports",
      url: "/",
      icon: NotebookText,
      isDisabled: true,
      subLinks: [
        {
          title: "Create users",
          url: "/users/create"
        },

        {
          title: "List users",
          url: "/users"
        }
      ]
    }
  ]
});
export const generalSidebarRoutes = (): MenuSidebarRoutes => ({
  title: "General",
  routeLinks: [
    {
      isDisabled: true,
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon
    }
  ]
});
