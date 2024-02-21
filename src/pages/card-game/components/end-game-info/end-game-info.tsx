import { Stack, Typography } from "@mui/material";

interface EndGameInfoProps {
  score: number;
  timeLeft: number;
}
const EndGameInfo = ({ score, timeLeft }: EndGameInfoProps) => {
  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Typography>Score:{score + timeLeft}</Typography>
    </Stack>
  );
};

export default EndGameInfo;
