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
  const images = arr.slice(0, size);
  return images
    .flatMap((item, index) => [
      { id: index + 200, item, value: index, flip: false, delete: false },
      { id: index + 100, item, value: index, flip: false, delete: false },
    ])
    .sort(() => Math.random() - 0.5);
};
const GameGrid = () => {
  const [sizeImages] = useState(5);
  const [images, setImages] = useState<Item[]>(
    getImages(itemsBigScreen, sizeImages)
  );

  const [selection, setSelection] = useState<Item[]>([]);

  const handleSelectCard = (item: Item) => {
    if (!item.delete) {
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
    }
  };
  useEffect(() => {
    if (selection.length === 2) {
      let newImages = [...images];
      if (
        selection[0].value === selection[1].value &&
        selection[0].id !== selection[1].id
      ) {
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
