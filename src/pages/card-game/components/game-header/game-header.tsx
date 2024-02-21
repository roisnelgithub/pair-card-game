import { Button, Stack, Typography } from "@mui/material";
import HeaderTimer from "./header-timer";

interface GameHeaderProps {
  score: number;
  isPlaying: boolean;
  thereIsAWinner: boolean;
  thereIsALoser: boolean;
  onStartPlay: () => void;
  onResetGame: () => void;
  onWinner: (value: number) => void;
  onLost: () => void;
}
const GameHeader = ({
  score,
  isPlaying,
  thereIsAWinner,
  thereIsALoser,
  onStartPlay,
  onResetGame,
  onWinner,
  onLost,
}: GameHeaderProps) => {
  return (
    <Stack direction="column" spacing={2} alignItems={"center"}>
      <Typography variant="h4">Card Game</Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ maxWidth: "450px", width: "100%" }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Typography sx={{ width: "80px" }}>Score: {score}</Typography>

        <HeaderTimer
          isPlaying={isPlaying}
          thereIsAWinner={thereIsAWinner}
          thereIsALoser={thereIsALoser}
          onWinner={onWinner}
          onLost={onLost}
        />

        <Button
          variant="outlined"
          size="medium"
          color="error"
          onClick={isPlaying ? onResetGame : onStartPlay}
        >
          {isPlaying ? "Reset" : "Start"}
        </Button>
      </Stack>
      <Typography fontSize={"0.8rem"} textAlign={"start"}>
        Complete the pairs of cards in the shortest time possible
      </Typography>
    </Stack>
  );
};
export default GameHeader;
