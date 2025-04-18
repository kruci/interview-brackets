// TODO: move types to separate files
// NOTE: generated
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

// NOTE: API seem to be very unstable on this path (or I have bad wifi ?)
export const getPaginatedPeople = async (page = 1, search?: string) => {
  const searchParams = new URLSearchParams();

  if (page) {
    searchParams.set("page", `${page}`);
  }

  if (search) {
    searchParams.set("search", search);
  }

  const runRequest = async () =>
    fetch(`${baseUrl}/people/?${searchParams.toString()}`).then(
      (res) => res.json() as unknown as PaginatedPeople
    );

  // TODO: make nicer if time
  // Because of the Instability issues I experience, we just try again later
  try {
    return runRequest();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return runRequest();
  }
};

export const getIdFromUrl = (url: string) => {
  const match = url.match(/(\d*)\/$/);
  return `${match?.[1]}`;
};

export const getPerson = async (personId: string) =>
  fetch(`${baseUrl}/people/${personId}`).then(
    (res) => res.json() as unknown as Person
  );

export const getPersonPlanet = async (person: Person) => {
  if (!person.homeworld) {
    return "unknown";
  }

  const planetId = getIdFromUrl(person.homeworld);

  return fetch(`${baseUrl}/planets/${planetId}`).then(async (res) => {
    const data = (await res.json()) as unknown as { name: string };
    return data.name;
  });
};

export const getPersonSpecies = async (person: Person) => {
  if (!person.species?.length) {
    return ["unknown"];
  }

  const species = await Promise.all(
    person.species.map(async (speciesUrl) => {
      const speciesId = getIdFromUrl(speciesUrl);

      return fetch(`${baseUrl}/species/${speciesId}`).then(async (res) => {
        const data = (await res.json()) as unknown as { name: string };
        return data.name;
      });
    })
  );

  return species;
};
