import { DefaultPluginProps } from ".";

export interface ProductBrandProps extends DefaultPluginProps {
  name: string;
  slug?: string;
  description?: string;
  accountId?: string;
  wareHouseId?: string;
}
