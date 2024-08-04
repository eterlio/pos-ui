import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { SimpleTableProps } from "./type";

const SimpleTable: FC<SimpleTableProps> = ({ data, columns, caption, footerData }) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {footerData &&
          footerData.length > 0 &&
          footerData.map((footerRow, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {footerRow[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableFooter>
    </Table>
  );
};

export default SimpleTable;
