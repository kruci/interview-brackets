import { Card, CardContent, CardHeader } from "@mui/material";
import { Filter } from "./Filter";
import { PeopleTable } from "./PeopleTable/PeopleTable";

interface PeoplePageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    minHeight?: string;
  }>;
}

export default async function People(props: PeoplePageProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const minHeight = Number(searchParams?.minHeight) || 1;
  const search = searchParams?.search || "";

  console.log("searchParams", searchParams);

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardHeader title={<Filter />}></CardHeader>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <PeopleTable page={currentPage} minHeight={minHeight} search={search} />
      </CardContent>
    </Card>
  );
}
