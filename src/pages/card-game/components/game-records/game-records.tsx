import { useEffect, useState } from "react";
import RecordsTable from "./records-table";
import { Button, Stack, Typography } from "@mui/material";
import { getAllRecords } from "@/helpers/supabase-queries";

export interface Record {
  id: number;
  createAt: string;
  name: string;
  score: number;
}
interface GameRecordsProps {
  refreshRecords: boolean;
  onRefreshManual: () => void;
}

const GameRecords = ({ refreshRecords, onRefreshManual }: GameRecordsProps) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      getAllRecords()
        .then((res) => {
          if (res !== null) {
            if (res.data === null) {
              setRecords([]);
            } else {
              setRecords(res.data);
            }
            if (res.error !== null) {
              setError("Something want wrong, try later");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setError("Something want wrong ");
    }
  }, [refreshRecords]);
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      width={"100%"}
      spacing={2}
    >
      <Typography variant="h5">Record list</Typography>
      {isLoading ? (
        "Loading..."
      ) : error === null ? (
        <Stack
          direction={"column"}
          justifyContent={"center"}
          sx={{ maxWidth: "350px" }}
          spacing={2}
        >
          {records.length > 0 ? (
            <RecordsTable records={records} />
          ) : (
            <Typography>There are no scores yet!</Typography>
          )}
        </Stack>
      ) : (
        <Stack direction="column" spacing={1}>
          <Typography>{error}</Typography>
          <Button
            variant={"outlined"}
            onClick={onRefreshManual}
            color="error"
            disabled={isLoading}
          >
            Refresh
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default GameRecords;
