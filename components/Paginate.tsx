"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, Stack } from "@mui/material";

type PaginateProps = {
  totalPages: number;
  currentPage: number;
};

const Paginate = ({ totalPages, currentPage }: PaginateProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Number(totalPages)}
        color="primary"
        variant="outlined"
        shape="rounded"
        page={Number(currentPage)}
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default Paginate;
