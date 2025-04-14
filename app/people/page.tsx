import { Card, CardContent, CardHeader } from "@mui/material";
import { Filter } from "./Filter";

interface PeoplePageProps {
    searchParams?: Promise<{
      page?: string;
      search?: string;
}>;
  }

export default async function People(props: PeoplePageProps) {
    const searchParams = await props.searchParams
    const currentPage = Number(searchParams?.page) || 1

    console.log('searchParams', searchParams)

  return (
    <Card>
      <CardHeader title={<Filter/>}></CardHeader>
      <CardContent>
        <>TODO: Table</>
      </CardContent>
    </Card>
  );
}
