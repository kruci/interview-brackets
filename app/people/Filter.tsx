"use client";
import {
  Box,
  IconButton,
  SliderOwnProps,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Slider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const SearchForm = styled("form")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

// TODO: use form control
export const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search");
  const initialHeight = searchParams.get("minHeight");
  const [searchValue, setSearchValue] = useState(initialSearch || "");
  const [minHeight, setMinHeight] = useState(Number(initialHeight ?? 0));

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchValue(event.target.value);

  const handleMinHeightChange: SliderOwnProps<number>["onChange"] = (
    _event,
    value
  ) => setMinHeight(value);

  const handleResetMinHeight = () => setMinHeight(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      newSearchParams.set("search", searchValue);
      // if we changed search we want to reset the page number so user can look from the start
      newSearchParams.delete("page");
    } else {
      newSearchParams.delete("search");
    }

    if (minHeight) {
      newSearchParams.set("minHeight", `${minHeight}`);
      // we do not reset page here, as we are doing "fake" filtering (just gray out rows that are not match)
    } else {
      newSearchParams.delete("minHeight");
    }

    router.replace(`/people?${newSearchParams.toString()}`);
  };

  return (
    <Box>
      <SearchForm
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        // no form action as we are not really doing anything requiring BE
      >
        <TextField
          sx={{ flex: 1 }}
          placeholder="Character name"
          value={searchValue}
          name="search"
          onChange={handleSearchChange}
          label="Character name"
        />
        <Box
          sx={{
            width: "160px",
            padding: "0 15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="min-height-label"
              color={minHeight ? "textSecondary" : "textDisabled"}
              variant="caption"
            >
              Min height ({minHeight}cm)
            </Typography>
            <IconButton
              type="reset"
              sx={{ p: "4px", fontSize: "10px" }}
              aria-label="clear min height filter"
              onClick={handleResetMinHeight}
              title="Clear min height filter"
            >
              <CancelIcon sx={{ height: "14px", width: "auto" }} />
            </IconButton>
          </Box>

          <Slider
            aria-labelledby="min-height-label"
            min={0}
            max={500}
            step={10}
            valueLabelDisplay="auto"
            value={minHeight}
            onChange={handleMinHeightChange}
          />
        </Box>
        <IconButton
          type="submit"
          aria-label="Apply filter"
          size="large"
          title="Apply filter"
        >
          <SearchIcon />
        </IconButton>
      </SearchForm>
    </Box>
  );
};
