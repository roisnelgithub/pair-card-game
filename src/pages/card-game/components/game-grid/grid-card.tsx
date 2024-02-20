import { Box } from "@mui/material";
import image from "@/assets/christmas-paper.jpg";
import { ReactNode } from "react";

export interface Item {
  id: number;
  item: ReactNode;
  value: number;
  flip: boolean;
  delete: boolean;
}
interface GridCardProps {
  item: Item;
}
const GridCard = ({ item }: GridCardProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        perspective: "2000px",
        backgroundColor: "transparent",
      }}
    >
      {/* Inner */}
      <Box
        sx={{
          cursor: "pointer",
          position: "relative",
          transition: "all 500ms ease",
          width: "80px",
          height: "80px",
          transformStyle: "preserve-3d",
          transform: `${item.flip ? "rotateY(-180deg)" : ""}`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            position: "absolute",
          }}
        >
          <img
            src={image}
            width={"100%"}
            style={{
              borderRadius: "5px",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            backgroundColor: "white",
            borderRadius: "5px",
            transform: "rotateY(180deg)",
          }}
        >
          {item.item}
        </Box>
      </Box>
    </Box>
  );
};

export default GridCard;
