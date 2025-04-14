import { Card, CardContent, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Card sx={{ position: "relative" }}>
      <Skeleton variant="rectangular" height={300} />
      <CardContent>
        <Skeleton variant="text" height={40} sx={{ marginBottom: "16px" }} />
        <Skeleton variant="rectangular" height={200} />
      </CardContent>
    </Card>
  );
}
