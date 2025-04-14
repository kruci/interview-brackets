import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Filter } from "./Filter";

export default function Loading() {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardHeader title={<Filter />}></CardHeader>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <Skeleton variant="rectangular" height={500} />
      </CardContent>
    </Card>
  );
}
