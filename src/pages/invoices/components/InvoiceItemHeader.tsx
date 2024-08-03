const InvoiceItemHeader = () => {
  return (
    <div className="flex item-center text-[12px]">
      <div className="w-[60%] flex gap-x-4 items-center">
        <div className="item-title">
          <p>ITEM</p>
        </div>
      </div>
      <div className="w-[40%] flex items-center justify-between">
        <p>QUANTITY</p>
        <p>AMOUNT</p>
        <p>TOTAL</p>
      </div>
    </div>
  );
};

export default InvoiceItemHeader;
