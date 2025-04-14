import { List } from "@mui/material";
import React from "react";
import { getPaginatedPeople } from "../../starwarsApi/swapi.py4e";
import { PeopleTablePagination } from "./PeopleTablePagination";
import { PeopleTableRow } from "./PeopleTableRow";

type PeopleTableProps = {
  page: number;
  minHeight: number;
  search: string;
};

export const PeopleTable = async ({
  page,
  minHeight,
  search,
}: PeopleTableProps) => {
  const people = await getPaginatedPeople(page, search);

  return (
    <>
      <List
        aria-label="List of people"
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
        page={page}
        numberOfPages={Math.ceil(people.count / 10)}
      />
    </>
  );
};
