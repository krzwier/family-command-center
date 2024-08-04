import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import CalendarIcon from "react-calendar-icon";
import { ThemeProvider } from "@emotion/react";
import AnalogClock from "analog-clock-react";
import { ClockNumbers } from "./ClockNumbers";
import { Colors } from "../DefaultTheme";
import { PropTypes } from "prop-types";

const calendarIconTheme = {
  calendarIcon: {
    textColor: "white",
    primaryColor: Colors.greyBackground,
    backgroundColor: "white",
  },
};

export const DateTime = ({ title, subtitle }) => {
  // const [time, setTime] = useState(dayjs(initialDate));

  // const tick = () => {
  //     setTime(dayjs((new Date()).toString()));
  // }

  // useEffect(() => {
  //     const timerId = setInterval(() => tick(), 1000);
  //     return () => {
  //         clearInterval(timerId);
  //     };
  // })

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        overflow="hidden"
        paddingLeft={4}
        paddingRight={2}
        paddingTop={2}
        paddingBottom={5}
        height="180px"
      >
        <Grid container item alignItems="center" xs={6}>
          <Grid container alignItems="baseline">
            <Typography variant="h2">{title ?? ""}</Typography>
            {title ? (
              <Typography variant="h2" paddingX={2}>
                |
              </Typography>
            ) : (
              <></>
            )}
            <Typography variant="subtitle1">{subtitle ?? ""}</Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="end" xs={6}>
          <AnalogClock width="132px" baseColor={Colors.greyBackground} />
          <ClockNumbers />
        </Grid>
      </Grid>
    </>
  );
};

DateTime.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
