import { List, Typography } from "@mui/material";
import React from "react";
import { getPaginatedPeople } from "../../starwarsApi/swapi.py4e";
import { PeopleTablePagination } from "./PeopleTablePagination";
import { PeopleTableRow } from "./PeopleTableRow";

type PeopleTableProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    minHeight?: string;
  }>;
};

export const PeopleTable = async ({ searchParams }: PeopleTableProps) => {
  const awaitedSearchParams = await searchParams;
  const currentPage = Number(awaitedSearchParams?.page) || 1;
  const minHeight = Number(awaitedSearchParams?.minHeight) || 1;
  const search = awaitedSearchParams?.search || "";
  const people = await getPaginatedPeople(currentPage, search);

  if (!people.count) {
    return (
      <Typography variant="body1" color="error" align="center">
        No results for this search
      </Typography>
    );
  }

  return (
    <>
      <List
        aria-label="List of people"
        aria-live="polite"
        role="table"
        sx={{ overflow: "auto", padding: "6px" }}
      >
        {people.results.map((person) => (
          <PeopleTableRow
            person={person}
            minHeight={minHeight}
            key={person.url}
          />
        ))}
      </List>
      <PeopleTablePagination
        page={currentPage}
        numberOfPages={Math.ceil(people.count / 10)}
      />
    </>
  );
};
