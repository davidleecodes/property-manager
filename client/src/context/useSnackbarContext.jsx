import { useState, useContext, createContext, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const SnackBarContext = createContext({
  updateSnackBarMessage: () => null,
});

export const SnackBarProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const updateSnackBarMessage = useCallback((message) => {
    setMessage(message);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarHandleClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ updateSnackBarMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SnackBarContext.Provider>
  );
};

export function useSnackBar() {
  return useContext(SnackBarContext);
}
