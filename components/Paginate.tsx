"use client";

import React from "react";

import { Pagination, Stack } from "@mui/material";
import { AdzunaAPIQuery } from "@/@types/adzuna";

type PaginateProps = {
  totalPages: number;
  currentPage: number;
  updateQuery: (updates: Partial<AdzunaAPIQuery>) => void;
};

const Paginate = ({ totalPages, currentPage, updateQuery }: PaginateProps) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    updateQuery({ page: value });
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Number(totalPages)}
        color="primary"
        variant="outlined"
        shape="rounded"
        page={Number(currentPage)}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Paginate;
