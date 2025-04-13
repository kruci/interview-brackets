import {
  getPaginatedPeople,
  getPerson,
  getPersonId,
} from "@/app/starwarsApi/swapi.py4e";

type PersonProps = {
  params: Promise<{ personId: string }>;
};

export default async function Person({ params }: PersonProps) {
  const { personId } = await params;
  const person = await getPerson(personId);

  return (
    <>
      <p>Viewing {personId}</p>
      <code>{JSON.stringify(person)}</code>
    </>
  );
}

/**
 * Prebuild first page of people
 * Rest will be build on demand
 */
export const dynamicParams = true;
export async function generateStaticParams() {
  const people = await getPaginatedPeople();

  return people.results.map((person) => ({ personId: getPersonId(person) }));
}
