import DashboardLayout from "@/components/dashboard/Layout";
import { formatCurrency } from "@/helpers";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { SalesProps } from "@/interfaces/sales";
import { formatDate } from "@/utils";
import { useParams } from "react-router-dom";

const ViewSaleScreen = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isFetching } = useGeneralQuery<SalesProps>({
    queryKey: ["sales", id],
    url: `/sales/${id}`,
    enabled: true,
    requireAuth: true
  });

  const discrepancy = (data?.amountPaid || 0) - (data?.invoiceData?.totalAmount || 0);
  const date = new Date(data?.createdAt || "");
  return (
    <DashboardLayout pageTitle="Sales Report" pageDescription="Single sales report details" isLoading={isFetching}>
      <div className="receipt mx-auto p-8">
        <div id="remark" className="remark"></div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <p>
            Date: <span className="font-bold">{date ? formatDate(date.toString(), "dd/MM/yyyy HH:mm:ss") : null}</span>
          </p>

          <p>
            Receipt #: <span className="font-bold">{data?.receiptNumber}</span>
          </p>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <p>
            Teller:
            <span className="font-bold">{data?.createdByData?.fullName}</span>
          </p>
          <p>
            Customer:
            <span className="font-bold">{`${data?.customerData?.firstName} ${data?.customerData?.lastName}`}</span>
          </p>
        </div>
        <table className="w-full mb-6">
          <thead className="bg-gray-100">
            <tr className="p-1">
              <th className="text-left text-sm font-bold py-2">Item</th>
              <th className="text-right text-sm font-bold py-2">Price</th>
              <th className="text-right text-sm font-bold py-2">Qty</th>
              <th className="text-right text-sm font-bold py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.invoiceData?.items.map((item, index) => {
              return (
                <tr className="border-b" key={index}>
                  <td className="text-left text-sm py-2">{item.name}</td>
                  <td className="text-right text-sm py-2">{item.price}</td>
                  <td className="text-right text-sm py-2">{item.quantity}</td>
                  <td className="text-right text-sm py-2">{formatCurrency({ value: item.price * item.quantity })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mb-6">
          <div className="flex justify-between text-sm">
            <p className="font-bold">Subtotal:</p>
            <p>{formatCurrency({ value: data?.invoiceData?.totalAmount || 0 })}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="font-bold">Tax (0%):</p>
            <p>0</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="font-bold">Total:</p>
            <p>{formatCurrency({ value: data?.invoiceData?.totalAmount || 0 })}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 mb-4"></div>
        <div className="mb-6">
          <div className="flex justify-between text-sm">
            <p className="font-bold">Cash Received:</p>
            <p>{formatCurrency({ value: data?.amountPaid || 0 })}</p>
          </div>

          {discrepancy >= 0 && (
            <div className="flex justify-between text-sm">
              <p className="font-bold">Change Given:</p>
              <p>{formatCurrency({ value: discrepancy })}</p>
            </div>
          )}

          {discrepancy < 0 && (
            <div className="flex justify-between text-sm">
              <p className="font-bold text-red-600">Arrears:</p>
              <p>{formatCurrency({ value: discrepancy })}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewSaleScreen;
