import { Box, Grid } from "@mui/material";
import {
  AdornmentIcon,
  AutumnIcon,
  BeanieIcon,
  CandyIcon,
  ClausIcon,
  ColdIceIcon,
  DeerIcon,
  HouseIcon,
  MittensIcon,
  SnowmanIcon,
} from "../../christmas-icons";
import GridCard, { Item } from "./grid-card";
import { ReactNode, useEffect, useState } from "react";

const itemsBigScreen: ReactNode[] = [
  <ClausIcon />,
  <AdornmentIcon />,
  <AutumnIcon />,
  <BeanieIcon />,
  <CandyIcon />,
  <ColdIceIcon />,
  <DeerIcon />,
  <HouseIcon />,
  <MittensIcon />,
  <SnowmanIcon />,
];

const getImages = (arr: ReactNode[], size: number) => {
  const random = arr.sort(() => Math.random() - 0.5);
  const images = random.slice(0, size);

  return images
    .flatMap((item, index) => [
      {
        id: crypto.randomUUID(),
        item,
        value: index,
        flip: false,
        delete: false,
      },
      {
        id: crypto.randomUUID(),
        item,
        value: index,
        flip: false,
        delete: false,
      },
    ])
    .sort(() => Math.random() - 0.5);
};
interface GameGridProps {
  size: number;
  isPlaying: boolean;
  reset: boolean;
  thereIsALoser: boolean;
  onClickCard: () => void;
  onFindPair: () => void;
  onReset: (value: boolean) => void;
}
const GameGrid = ({
  size,
  isPlaying,
  reset,
  onClickCard,
  onFindPair,
  onReset,
  thereIsALoser,
}: GameGridProps) => {
  const [images, setImages] = useState<Item[]>(getImages(itemsBigScreen, size));
  const [selection, setSelection] = useState<Item[]>([]);

  const handleSelectCard = (item: Item) => {
    if (!isPlaying || thereIsALoser || item.delete) return;
    onClickCard();
    const newImages = images.map((img) => {
      if (img.id === item.id) {
        img.flip = !item.flip;
      }
      return img;
    });
    setImages(newImages);
    if (selection.length < 2) {
      setSelection([...selection, item]);
    }
  };
  useEffect(() => {
    if (selection.length === 2) {
      let newImages = [...images];
      if (
        selection[0].value === selection[1].value &&
        selection[0].id !== selection[1].id
      ) {
        onFindPair();
        newImages = newImages.map((img) => {
          if (img.value === selection[0].value) {
            img.delete = true;
          }
          return img;
        });
      }
      newImages = newImages.map((img) => {
        if (!img.delete) {
          img.flip = false;
        }
        return img;
      });
      setTimeout(() => {
        setImages(newImages);
        setSelection([]);
      }, 500);
    }
  }, [selection]);

  useEffect(() => {
    if (reset) {
      onReset(false);
      setImages(getImages(itemsBigScreen, size));
    }
  }, [reset]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        gap={2}
        maxWidth={"500px"}
        justifyContent={"center"}
        padding={"1rem"}
      >
        {images.map((item) => (
          <Grid item key={item.id}>
            <Box onClick={() => handleSelectCard(item)}>
              <GridCard item={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameGrid;
