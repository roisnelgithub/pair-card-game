import { useEffect, useState } from "react";
import RecordsTable from "./records-table";
import { Stack, Typography } from "@mui/material";
import { getAllRecords } from "@/helpers/supabase-queries";

export interface Record {
  id: number;
  createAt: string;
  name: string;
  score: number;
}
interface GameRecordsProps {
  refreshRecords: boolean;
}

const GameRecords = ({ refreshRecords }: GameRecordsProps) => {
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
              setError(res.error?.message);
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
    <Stack direction={"column"} alignItems={"center"} width={"100%"}>
      {isLoading ? (
        "Loading..."
      ) : error === null ? (
        <Stack
          direction={"column"}
          justifyContent={"center"}
          sx={{ maxWidth: "350px" }}
          spacing={2}
        >
          <Typography>Record list</Typography>
          {records.length > 0 ? (
            <RecordsTable records={records} />
          ) : (
            <Typography>There are no scores yet!</Typography>
          )}
        </Stack>
      ) : (
        <Typography>{error}</Typography>
      )}
    </Stack>
  );
};

export default GameRecords;
