import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";

const NavigationPagination = ({
  page,
  hasNext,
}: {
  page: number;
  hasNext: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasPrevious = page > 1;

  const goToNextPage = () => {
    const nextPage = (page + 1).toString();
    setSearchParams({ page: nextPage });
  };
  const goToPreviousPage = () => {
    const previousPage = (page - 1).toString();
    setSearchParams({ page: previousPage });
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={goToPreviousPage}
            className={
              !hasPrevious
                ? "cursor-not-allowed pointer-events-none text-gray-200"
                : ""
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={goToNextPage}
            className={
              !hasNext
                ? "cursor-not-allowed pointer-events-none text-gray-200"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default NavigationPagination;
