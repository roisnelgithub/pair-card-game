import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Record } from "./game-records";
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from "@/components";

// function createData(id: number, name: string, score: number) {
//   return { id, name, score };
// }

// const rows = [
//   createData(1, "roy", 24),
//   createData(2, "roy2", 43),
//   createData(3, "roy3", 56),
// ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    fontSize: 14,
  },
}));

interface RecordsTableProps {
  records: Record[];
}
export default function RecordsTable({ records }: RecordsTableProps) {
  return (
    <TableContainer
      component={Box}
      sx={{ width: "100%", border: "1px solid white" }}
    >
      <Table sx={{ minWidth: 320 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ color: "white" }}>
            <StyledTableCell align="center">Place</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Record</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{
                "td,th": { border: 0 },
              }}
            >
              <StyledTableCell component="th" scope="row" align="center">
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={1}
                >
                  {index + 1}
                  {index === 0 ? (
                    <GoldMedalIcon />
                  ) : index === 1 ? (
                    <SilverMedalIcon />
                  ) : index === 2 ? (
                    <BronzeMedalIcon />
                  ) : (
                    ""
                  )}
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.points}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
