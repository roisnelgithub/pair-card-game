import { useCallback, useEffect, useRef, useState } from "react";
import { GameGrid, GameHeader, GameRecords } from "./components";
import { CustomModal } from "@/components";
import EndGameInfo from "./components/end-game-info/end-game-info";

const CardGamePage = () => {
  const [sizeImages] = useState<number>(2);
  const initialPoints = sizeImages * 4;
  const [points, setPoints] = useState<number>(initialPoints);
  const [score, setScore] = useState<number>(0);
  const [pairs, setPairs] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [lost, setLost] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  let amountOfClick = useRef(0);

  const clickCounter = () => {
    amountOfClick.current = amountOfClick.current + 1;
    if (points > 0) {
      setPoints((state) => state - 1);
    }
  };
  const pairsCounter = () => {
    setPairs((state) => state + 1);
  };

  useEffect(() => {
    if (pairs === sizeImages) {
      setWin(true);
      handleOpen();
    }
    if (amountOfClick.current > 0) {
      setScore((state) => state + points);
      setPoints(initialPoints);
    }
  }, [pairs]);

  const startPlay = () => {
    setIsPlaying(true);
  };
  const resetGame = () => {
    amountOfClick.current = 0;
    setReset(true);
    setPoints(initialPoints);
    setScore(0);
    setPairs(0);
    setIsPlaying(false);
    setWin(false);
    setLost(false);
    setTimeLeft(0);
  };
  const handleWin = useCallback((time: number) => {
    handleTimeLeft(time);
  }, []);
  const handleTimeLeft = (time: number) => {
    setTimeLeft(time);
  };
  const handleLost = useCallback(() => {
    handleTimeOut();
  }, []);
  const handleTimeOut = () => {
    setLost(true);
    setScore(0);
    handleOpen();
  };

  return (
    <>
      <GameHeader
        score={score}
        onStartPlay={startPlay}
        isPlaying={isPlaying}
        onResetGame={resetGame}
        thereIsAWinner={win}
        onWinner={handleWin}
        thereIsALoser={lost}
        onLost={handleLost}
      />
      <GameGrid
        size={sizeImages}
        isPlaying={isPlaying}
        reset={reset}
        onReset={setReset}
        onClickCard={clickCounter}
        onFindPair={pairsCounter}
        thereIsALoser={lost}
      />
      <GameRecords />
      <CustomModal open={openModal} handleClose={handleClose}>
        <EndGameInfo score={score} timeLeft={timeLeft} />
      </CustomModal>
    </>
  );
};

export default CardGamePage;
