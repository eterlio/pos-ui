import { useSetQueryParam } from "./hooks/useSetQueryParam";

interface PaginationNumbersProps {
  itemsPerPage: number;
  totalDocument: number;
}
export default function PaginationNumbers({
  itemsPerPage,
  totalDocument,
}: PaginationNumbersProps) {
  const { setQueryParam, getQueryParam } = useSetQueryParam();

  const totalPages = Math.ceil(totalDocument / itemsPerPage);
  const pageRange = 1; // Number of page numbers to display around the current page.
  const currentPage = Number(getQueryParam("currentPage")) || 1;
  // Function to generate an array of page numbers to display.
  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= pageRange * 2 + 1) {
      // If there are not enough pages to show ellipsis, display all page numbers.
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise, determine which page numbers to display.
      if (currentPage <= pageRange + 1) {
        pageNumbers.push(
          ...Array.from({ length: pageRange * 2 + 1 }, (_, i) => i + 1)
        );
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - pageRange) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(
          ...Array.from(
            { length: pageRange * 2 + 1 },
            (_, i) => totalPages - pageRange * 2 + i
          )
        );
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(
          ...Array.from(
            { length: pageRange * 2 + 1 },
            (_, i) => currentPage - pageRange + i
          )
        );
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handleGeneratePageNumber = (generatedNumber: number | string) => {
    if (typeof generatedNumber === "number") {
      setQueryParam("currentPage", String(generatedNumber));
    }
  };
  return (
    <div>
      <ul className="flex items-center gap-2">
        {generatePageNumbers().map((generatedNumber) => {
          return (
            <li
              key={Math.random() * generatePageNumbers().length}
              className={
                generatedNumber === currentPage
                  ? "bg-primary order rounded flex items-center justify-center h-8 w-8 p-0 text-white cursor-pointer"
                  : "border rounded flex items-center justify-center h-8 w-8 p-0 cursor-pointer"
              }
              onClick={() => handleGeneratePageNumber(generatedNumber)}
            >
              {generatedNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
