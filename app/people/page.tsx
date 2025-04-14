import { Card, CardContent, CardHeader } from "@mui/material";
import { Filter } from "./Filter";
import { PeopleTable } from "./PeopleTable/PeopleTable";
import { Metadata } from "next";

interface PeoplePageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    minHeight?: string;
  }>;
}

export default function People({ searchParams }: PeoplePageProps) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardHeader title={<Filter />}></CardHeader>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/*
        We could have suspense here and make it so we see some loader on table each time we change page
        but page change is fast, so I do not want to bother with it
        <Suspense fallback={<Skeleton variant="rectangular" height={500} />} key={JSON.stringify(searchParams)}>
         */}
        <PeopleTable searchParams={searchParams} />
        {/*
        </Suspense>
         */}
      </CardContent>
    </Card>
  );
}

export const metadata: Metadata = {
  title: "StarWars character list",
  description:
    "Page showing characters from StarWards with very limited filtering and ugly UI",
};
