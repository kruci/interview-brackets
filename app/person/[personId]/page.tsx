import {
  getPerson,
  getPersonPlanet,
  getPersonSpecies,
} from "@/app/starwarsApi/swapi.py4e";
import { getPersonImageScr } from "@/app/starwarsApi/swapiGallery";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { PersonInfoTable } from "./PersonInfoTable";
import { PersonImageModal } from "./PersonImageModal";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PersonProps = {
  params: Promise<{ personId: string }>;
};

export default async function Person({ params }: PersonProps) {
  const { personId } = await params;
  const person = await getPerson(personId);
  const planetName = await getPersonPlanet(person);
  const speciesNames = await getPersonSpecies(person);
  const personImageSrc = getPersonImageScr(personId);

  if ((person as { detail?: string })?.detail === "Not found") {
    return notFound();
  }

  return (
    <Card sx={{ position: "relative" }}>
      {/** Maybe it would look better if I just have image on the left and info on the right ? */}
      <CardMedia
        sx={{ height: 300 }}
        image={personImageSrc}
        title={person.name}
      />
      <PersonImageModal name={person.name} imageUrl={personImageSrc} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
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
 * Create first ${MAX_PREBUILD_PAGES} pages during build time
 * Rest will be build on demand
 */
const MAX_PREBUILD_PAGES = 40;
export const dynamicParams = true;
export async function generateStaticParams() {
  /**
   * If we would not know some bounds, we could use something like bellow to prebuild part of the
   * pages, or keep getting id until we reach some threshold (time or size) to prebuild X pages

     const people = await getPaginatedPeople();

    return people.results.map((person) => ({
      personId: getIdFromUrl(person.url),
    }));
   */

  return new Array(MAX_PREBUILD_PAGES)
    .fill("")
    .map((_value, index) => ({ personId: `${index + 1}` }));
}

export async function generateMetadata({
  params,
}: PersonProps): Promise<Metadata> {
  const { personId } = await params;
  const person = await getPerson(personId);
  const name = person.name;

  const metadata: Metadata = {
    title: `Character page - ${name}`,
    description: `Character page for #{name}`,
  };

  return metadata;
}
