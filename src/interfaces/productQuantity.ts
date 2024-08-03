import { DefaultPluginProps } from ".";

export interface ProductQuantityProps extends DefaultPluginProps {
	productId: string;
	availableQuantity: number;
	reservedQuantity?: number;
	accountId?: string;
	warehouseId?: string;
}
