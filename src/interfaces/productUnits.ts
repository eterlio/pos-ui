import { DefaultPluginProps } from ".";


export interface ProductUnitProps extends DefaultPluginProps  {
    title: string;
    name: string;
    slug?: string;
    description?: string;
    accountId: string;
    wareHouseId?: string;
}