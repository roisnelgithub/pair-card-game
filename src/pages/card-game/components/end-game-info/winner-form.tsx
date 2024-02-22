import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useState } from "react";
import { insertScore } from "@/helpers/supabase-queries";

interface WinnerFormProps {
  score: number;
  onSaveDone: () => void;
  onSubmitting: (value: boolean) => void;
}
const WinnerForm = ({ score, onSaveDone, onSubmitting }: WinnerFormProps) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setError(false);
    }
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      setError(true);
    } else {
      setIsLoading(true);
      onSubmitting(true);
      insertScore(name, score)
        .then((res) => {
          if (res != null) {
            if (res.code === "23505") {
              setErrorOnSubmit(`Name ${name} already exist`);
            } else {
              setErrorOnSubmit("Failed to save, check your network!");
            }
          } else {
            onSaveDone();
          }
        })
        .finally(() => {
          setIsLoading(false);
          onSubmitting(false);
        });

      try {
      } catch (error) {
        setErrorOnSubmit("Something want wrong ");
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={"column"} spacing={2}>
        <Typography>Do you want to save this record?</Typography>
        <TextField
          id="name-input"
          label="Name *"
          size="small"
          value={name}
          error={error || errorOnSubmit != ""}
          onChange={handleChange}
          disabled={isLoading}
          helperText={
            error
              ? "Name is required"
              : errorOnSubmit != ""
              ? errorOnSubmit
              : ""
          }
        />

        <Button
          variant="contained"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={24} /> : <SaveAsIcon />
          }
          fullWidth
          type="submit"
        >
          {isLoading ? (
            <Typography>SAVING</Typography>
          ) : (
            <Typography>SAVE</Typography>
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default WinnerForm;
