import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardHeader title={<Skeleton variant="rectangular" height={56} />}></CardHeader>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <Skeleton variant="rectangular" height={500} />
      </CardContent>
    </Card>
  );
}
