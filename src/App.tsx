import { Box } from "@mui/material";
import "./App.css";
import CardGamePage from "./pages/card-game/card-game-page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ xs: { p: "1rem", sm: { p: "1.5rem" } } }}>
        <CardGamePage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
