import { DefaultPluginProps } from ".";

export interface ProductCodeProps extends DefaultPluginProps {
  code: string;
  slug?: string;
  description?: string;
  accountId: string;
  wareHouseId?: string;
}
