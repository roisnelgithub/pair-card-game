import { CircularProgress, Stack, Typography } from "@mui/material";
import WinnerForm from "./winner-form";
import { useEffect, useState } from "react";
import { getAllGreaterThan } from "@/helpers/supabase-queries";

interface EndGameInfoProps {
  score: number;
  timeLeft: number;
  thereIsAWinner: boolean;
  onSaveDone: () => void;
  onSubmitting: (value: boolean) => void;
}
const EndGameInfo = ({
  score,
  timeLeft,
  thereIsAWinner,
  onSaveDone,
  onSubmitting,
}: EndGameInfoProps) => {
  const totalScore = score + timeLeft;

  const [place, setPlace] = useState<number>(0);
  const [isSearchingPlace, setIsSearchingPlace] = useState(true);
  const [errorOnSearch, setErrorOnSearch] = useState<string | null>(null);

  useEffect(() => {
    setIsSearchingPlace(true);
    if (timeLeft > 0) {
      try {
        getAllGreaterThan(score + timeLeft)
          .then((res) => {
            if (res.data !== null) {
              setPlace(res.data.length + 1);
            }
            if (res.error !== null) {
              setErrorOnSearch(res.error?.message);
            }
          })
          .finally(() => {
            setIsSearchingPlace(false);
          });
      } catch (error) {
        setErrorOnSearch("Something want wrong ");
      }
    }
  }, [timeLeft]);
  return (
    <Stack direction={"column"} justifyContent={"center"} spacing={2}>
      {thereIsAWinner ? (
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h5" textAlign={"center"}>
            WINNER
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Score: {totalScore}</Typography>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              {errorOnSearch == null && <Typography>Place:</Typography>}
              {isSearchingPlace ? (
                <CircularProgress size={16} />
              ) : (
                <Typography>
                  {errorOnSearch == null ? (
                    place
                  ) : (
                    <Typography color={"error"}>Failed to fetch</Typography>
                  )}
                </Typography>
              )}
            </Stack>
          </Stack>
          <WinnerForm
            score={totalScore}
            onSaveDone={onSaveDone}
            onSubmitting={onSubmitting}
          />
        </Stack>
      ) : (
        <Typography variant="h5" textAlign={"center"}>
          GAME OVER
        </Typography>
      )}
    </Stack>
  );
};

export default EndGameInfo;
