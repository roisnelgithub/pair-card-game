import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 320,
  background: "#3d3d3d",
  boxShadow: 8,
  p: 4,
};

interface CustomModalProps {
  children: React.ReactNode;
  open: boolean;
  isSubmitting: boolean;
  handleClose: () => void;
}
export default function CustomModal({
  children,
  open,
  isSubmitting,
  handleClose,
}: CustomModalProps) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="column" justifyContent={"center"} spacing={2}>
            {children}
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
