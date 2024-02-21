import { Typography } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import Countdown from "react-countdown";

interface HeaderTimerProps {
  isPlaying: boolean;
  thereIsAWinner: boolean;
  thereIsALoser: boolean;
  onWinner: (value: number) => void;
  onLost: () => void;
}
const HeaderTimer = ({
  isPlaying,
  thereIsAWinner,
  thereIsALoser,
  onWinner,
  onLost,
}: HeaderTimerProps) => {
  const countdownRef = useRef<Countdown>(null);
  useEffect(() => {
    if (isPlaying === true && !thereIsAWinner && !thereIsALoser) {
      countdownRef.current?.start();
    } else {
      countdownRef.current?.stop();
    }
    if (thereIsAWinner) {
      countdownRef.current?.pause();
      const timeLeft = countdownRef.current?.getRenderProps().seconds;
      if (timeLeft) {
        onWinner(timeLeft);
      }
    }
  }, [isPlaying, thereIsAWinner]);

  const handleTimeOut = () => {
    onLost();
  };

  return (
    <Typography sx={{ width: "60px" }}>
      Time:
      {thereIsALoser ? (
        0
      ) : (
        <Countdown
          date={Date.now() + 10000}
          renderer={(props) => props.seconds}
          autoStart={false}
          ref={countdownRef}
          onComplete={() => handleTimeOut()}
        ></Countdown>
      )}
    </Typography>
  );
};
export default memo(HeaderTimer);
