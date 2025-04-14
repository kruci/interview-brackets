import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={"/error.jpg"}
        title={"Person not found illustration"}
      />
      <CardContent>
        <Typography variant="body1" color="error" align="center">
          Person with this ID does not exist (404)
        </Typography>
      </CardContent>
    </Card>
  );
}
