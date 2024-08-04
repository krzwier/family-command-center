import React from "react";
import FullCalendar from "@fullcalendar/react";
import { Box } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";

export const Calendar = () => {
  return (
    <Box width="100%" paddingX={4} height="calc(100vh - 275px)">
      <FullCalendar
        contentHeight="auto"
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        eventSources={[
          {
            format: "json",
            url: "/api/getcalendar",
            extraParams: {
              calendar: "personal",
            },
            color: "#A67EC9",
          },
          {
            format: "json",
            url: "/api/getcalendar",
            extraParams: {
              calendar: "family",
            },
            color: "#6B92D6",
          },
          {
            format: "json",
            url: "/api/getcalendar",
            extraParams: {
              calendar: "primaryWork",
            },
            color: "#F58E9C",
          },
          {
            format: "json",
            url: "/api/getcalendar",
            extraParams: {
              calendar: "secondaryWork",
            },
            color: "#97C596",
          },
          {
            format: "json",
            url: "/api/getcalendar",
            extraParams: {
              calendar: "extracurricular",
            },
            color: "#61516C",
          },
        ]}
        eventBorderColor="black"
        displayEventEnd={false}
        eventShortHeight={30}
        eventMinHeight={25}
        eventMaxStack={2}
        slotMinTime="6:00:00"
        slotMaxTime="22:00:00"
        themeSystem="standard"
        weekends={true}
      />
    </Box>
  );
};
