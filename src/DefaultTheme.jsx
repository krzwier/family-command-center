import { createTheme } from "@mui/material/styles";

export const Colors = {
  yellow: "#ffd600",
  main: "#29b6f6",
  greyBackground: "#2f2f2f",
  rewardBackground: "#505050",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: Colors.main,
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "3rem",
      fontWeight: 100,
    },
  },
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.greyBackground,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "100%",
          backgroundColor: Colors.greyBackground,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.greyBackground,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.greyBackground,
          "& .MuiCardHeader-avatar": {
            marginRight: "20px",
          },
          "& .MuiCardHeader-title": {
            fontSize: "2em",
          },
          "&.reward": {
            backgroundColor: Colors.rewardBackground,
            paddingRight: "24px",
            "& .MuiCardHeader-title": {
              fontSize: "1.25em",
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontSize: "1.25em",
          },
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        root: {
          "& .MuiSpeedDialAction-staticTooltip": {
            padding: "20px 0",
            "& .MuiSvgIcon-root": {
              width: "64px",
              height: "64px",
            },
          },
          "& .MuiSpeedDialAction-staticTooltipLabel": {
            fontSize: "1.5rem",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderTop: 1,
          borderColor: "divider",
          backgroundColor: Colors.greyBackground,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          "& .MuiTabs-indicator": {
            top: 0,
          },
          "& .MuiSvgIcon-root": {
            width: "64px",
            height: "64px",
          },
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
          height: "calc(100vh - 109.5px)",
        },
      },
    },
  },
});
