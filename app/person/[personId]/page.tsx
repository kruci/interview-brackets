import {
  getPaginatedPeople,
  getPerson,
  getIdFromUrl,
  getPersonPlanet,
  getPersonSpecies,
} from "@/app/starwarsApi/swapi.py4e";
import { getPersonImageScr } from "@/app/starwarsApi/swapiGallery";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { PersonInfoTable } from "./PersonInfoTable";
import { PersonImageModal } from "./PersonImageModal";

type PersonProps = {
  params: Promise<{ personId: string }>;
};

export default async function Person({ params }: PersonProps) {
  const { personId } = await params;
  const person = await getPerson(personId);
  const planetName = await getPersonPlanet(person);
  const speciesNames = await getPersonSpecies(person);
  const personImageSrc = getPersonImageScr(personId);

  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        sx={{ height: 300 }}
        image={personImageSrc}
        title={person.name}
      />
      <PersonImageModal name={person.name} imageUrl={personImageSrc} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {person.name}
        </Typography>
        <PersonInfoTable
          person={person}
          planetName={planetName}
          speciesNames={speciesNames}
        />
      </CardContent>
    </Card>
  );
}

/**
 * Prebuild first page of people
 * Rest will be build on demand
 */
export const dynamicParams = true;
export async function generateStaticParams() {
  const people = await getPaginatedPeople();

  return people.results.map((person) => ({
    personId: getIdFromUrl(person.url),
  }));
}
