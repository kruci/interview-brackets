"use client";
import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";

/* eslint-disable @next/next/no-img-element */

type PersonImageModalProps = {
  imageUrl: string;
  name: string;
};

export const PersonImageModal = ({ imageUrl, name }: PersonImageModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="zoom in"
        title="zoom in"
        size="small"
        onClick={handleOpenDialog}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <ZoomInIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="lg"
        aria-labelledby="image-dialog-title"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle id="image-dialog-title">Image of {name}</DialogTitle>
          <IconButton aria-label="close" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <img
            src={imageUrl}
            alt={name}
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
