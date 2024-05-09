import { Row, flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";

interface TableBodyItemProps<TData> {
  row: Row<TData>;
  handleRowClick?: (data: Row<TData>["original"]) => void;
}
function TableBodyItem<TData>({
  row,
  handleRowClick,
}: TableBodyItemProps<TData>) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="cursor-pointer"
      onClick={() => {
        if (handleRowClick) {
          handleRowClick(row.original);
        }
      }}
    >
      {row &&
        row
          .getVisibleCells()
          .map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
    </TableRow>
  );
}

export default TableBodyItem;
