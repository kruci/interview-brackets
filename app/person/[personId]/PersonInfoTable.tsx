import { Box, Grid, Typography } from "@mui/material";
import { Person } from "../../starwarsApi/swapi.py4e";
import HeightIcon from "@mui/icons-material/Height";
import TransgenderIcon from "@mui/icons-material/Transgender";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Face3Icon from "@mui/icons-material/Face3";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Groups3Icon from "@mui/icons-material/Groups3";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";

type PersonInfoTableProps = {
  person: Person;
  planetName: string;
  speciesNames: string[];
};

export const PersonInfoTable = ({
  person,
  planetName,
  speciesNames,
}: PersonInfoTableProps) => {
  const gridData = [
    { label: "Gender", value: person.gender, icon: TransgenderIcon },
    { label: "Height", value: `${person.height}cm`, icon: HeightIcon },
    {
      label: "Skin color",
      value: person.skin_color,
      icon: FormatColorFillIcon,
    },
    { label: "Hair color", value: person.hair_color, icon: Face3Icon },
    { label: "Eye color", value: person.eye_color, icon: VisibilityIcon },
    { label: "Species", value: speciesNames.join(", "), icon: Groups3Icon },
    { label: "Birth Year", value: person.birth_year, icon: CakeIcon },
    { label: "HomeWorld", value: planetName, icon: PublicIcon },
  ];

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      role="table"
      aria-label="Character information"
      aria-rowcount={gridData.length}
    >
      {gridData.map(({ label, value, icon: Icon }) => (
        <Box
          key={label}
          sx={{ display: "flex", gap: "8px", flexDirection: "row" }}
          role="row"
        >
          <Typography sx={{ fontWeight: "700" }} role="row-header">
            {label}
            {Icon ? (
              <Icon
                sx={{
                  height: "16px",
                  display: "inline-flex",
                  width: "auto",
                  verticalAlign: "middle",
                  marginLeft: "4px",
                }}
              />
            ) : null}
            :
          </Typography>
          <Typography role="cell">{value}</Typography>
        </Box>
      ))}
    </Grid>
  );
};
