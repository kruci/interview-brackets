/**
 * A person within the Star Wars universe
 */
export type Person = {
  /**
   * An array of starship resources that this person has piloted
   */
  starships: string[];
  /**
   * the ISO 8601 date format of the time that this resource was edited.
   */
  edited: string;
  /**
   * The name of this person.
   */
  name: string;
  /**
   * The ISO 8601 date format of the time that this resource was created.
   */
  created: string;
  /**
   * The url of this resource
   */
  url: string;
  /**
   * The gender of this person (if known).
   */
  gender: string;
  /**
   * An array of vehicle resources that this person has piloted
   */
  vehicles: string[];
  /**
   * The skin color of this person.
   */
  skin_color: string;
  /**
   * The hair color of this person.
   */
  hair_color: string;
  /**
   * The height of this person in meters.
   */
  height: string;
  /**
   * The eye color of this person.
   */
  eye_color: string;
  /**
   * The mass of this person in kilograms.
   */
  mass: string;
  /**
   * An array of urls of film resources that this person has been in.
   */
  films: string[];
  /**
   * The url of the species resource that this person is.
   */
  species: string[];
  /**
   * The url of the planet resource that this person was born on.
   */
  homeworld: string;
  /**
   * The birth year of this person. BBY (Before the Battle of Yavin) or ABY (After the Battle of Yavin).
   */
  birth_year: string;
};

export type PaginatedPeople = {
  count: number;
  next?: string;
  previous?: string;
  results: Person[];
};

const baseUrl = `https://swapi.py4e.com/api`;

export const getPaginatedPeople = async (page = 1) =>
  fetch(`${baseUrl}/people/?page=${page}`).then(
    (res) => res.json() as unknown as PaginatedPeople
  );

export const getPersonId = (person: Person) => {
  const match = person.url.match(/(\d*)\/$/);
  console.log("Person", person);
  console.log("Matches", match?.[0], match?.[1]);

  return `${match?.[1]}`;
};

export const getPerson = (personId: string) =>
  fetch(`${baseUrl}/people/${personId}`).then(
    (res) => res.json() as unknown as Person
  );
