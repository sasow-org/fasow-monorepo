import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeProvider, createTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function NavBar() {
  const handleOpenUserMenu = () => {
    window.location.href = "https://github.com/sasow-org/sasow-ts/";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            sx={{
              ml: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SASOW-TS
          </Typography>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ mr: 2, ":hover": { borderRadius: 1 } }}
          >
            <GitHubIcon />
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                flexGrow: 1,
                fontWeight: 500,
                opacity: 0.8,
              }}
            >
              Open in GitHub
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
