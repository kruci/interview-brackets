"use client";
import { Pagination } from "@mui/material";
import { UsePaginationProps } from "@mui/material/usePagination";
import { useRouter, useSearchParams } from "next/navigation";

type PeopleTablePaginationProps = {
  page: number;
  numberOfPages: number;
};

export const PeopleTablePagination = ({
  page,
  numberOfPages,
}: PeopleTablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange: UsePaginationProps["onChange"] = (_event, newPage) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", `${newPage}`);

    router.replace(`/people?${newSearchParams.toString()}`);
  };

  return (
    <Pagination
      count={numberOfPages}
      page={page}
      variant="outlined"
      shape="rounded"
      aria-label="Pagination"
      sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      onChange={handleChange}
    />
  );
};
