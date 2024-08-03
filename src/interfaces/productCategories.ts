import { DefaultPluginProps } from ".";

export interface ProductCategoryProps extends DefaultPluginProps {
  name: string;
  slug?: string;
  description?: string;
  accountId: string;
  wareHouseId?: string;
}
