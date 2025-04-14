import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { getIdFromUrl, Person } from "../../starwarsApi/swapi.py4e";
import { getPersonImageScr } from "../../starwarsApi/swapiGallery";

type PeopleTableRowProps = {
  person: Person;
  minHeight: number;
};

export const PeopleTableRow = ({ person, minHeight }: PeopleTableRowProps) => {
  const personId = getIdFromUrl(person.url);
  const avatarUrl = getPersonImageScr(personId);
  const personUrl = `/person/${personId}`;
  const isTooShort = Number(person.height) < minHeight;
  const hasDefinedHeight = !isNaN(Number(person.height));
  const displayHeight = hasDefinedHeight
    ? `Height: ${person.height}cm`
    : "Height: ???";

  return (
    <>
      <ListItem
        component="a"
        slotProps={{
          root: { "aria-label": `Open ${person.name} profile` },
        }}
        href={personUrl}
        sx={{
          cursor: "pointer",
          padding: "12px 6px",
          "&:hover": {
            boxShadow: "4px 4px 11px -1px rgba(0, 0, 0, 0.75)",
          },
          filter: isTooShort ? "grayscale(1)" : undefined,
          background: isTooShort ? "#dbdbdb" : undefined,
        }}
      >
        <ListItemAvatar>
          <Avatar src={avatarUrl} alt={person.name} />
        </ListItemAvatar>
        <ListItemText primary={person.name} secondary={displayHeight} />
      </ListItem>
      <Divider />
    </>
  );
};
