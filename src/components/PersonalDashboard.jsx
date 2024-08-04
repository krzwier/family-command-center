import { usePerson } from "../hooks/UsePerson";
import { DateTime } from "./DateTime";
import { RoutineList } from "./RoutineList";
import { Grid, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { RewardPanel } from "./RewardPanel";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { PropTypes } from "prop-types";
import React from "react";
import { useRewards } from "../hooks/UseRewards";

const actions = [
  { icon: <AssignmentTurnedInIcon />, name: "Routines" },
  {
    icon: <EmojiEventsIcon />,
    name: "Rewards",
  },
  {
    icon: <PaidIcon />,
    name: "Chores",
  },
];

export const PersonalDashboard = ({ personId, color }) => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = React.useState(false);
  const openSpeedDial = () => setIsSpeedDialOpen(true);
  const closeSpeedDial = () => setIsSpeedDialOpen(false);
  const [currentComponent, setCurrentComponent] = useState("Routines");
  const person = usePerson(personId);
  const {
    rewardStatus,
    claimReward,
    unClaimReward,
    incrementPointBalance,
    decrementPointBalance,
  } = useRewards(personId);

  const getCurrentComponent = useCallback(() => {
    switch (currentComponent) {
      case "Routines":
        return (
          <RoutineList
            key={personId}
            personId={personId}
            color={color}
            incrementPointBalance={incrementPointBalance}
            decrementPointBalance={decrementPointBalance}
          />
        );
      case "Rewards":
        return (
          <DndProvider backend={TouchBackend}>
            <RewardPanel
              rewardStatus={rewardStatus}
              claimReward={claimReward}
              unClaimReward={unClaimReward}
            />
          </DndProvider>
        );
      default:
        return <></>;
    }
  }, [
    currentComponent,
    rewardStatus,
    claimReward,
    unClaimReward,
    incrementPointBalance,
    decrementPointBalance,
  ]);

  return (
    <Grid container height="calc(100vh - 109.5px)">
      <DateTime title={person.PersonName} subtitle={currentComponent} />

      {getCurrentComponent()}
      <SpeedDial
        ariaLabel="Dashboard actions"
        sx={{ position: "absolute", bottom: "140.5px", right: "36px" }}
        icon={<SpeedDialIcon />}
        onClose={closeSpeedDial}
        onOpen={openSpeedDial}
        open={isSpeedDialOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              setCurrentComponent(action.name);
              closeSpeedDial();
            }}
          />
        ))}
      </SpeedDial>
    </Grid>
  );
};

PersonalDashboard.propTypes = {
  personId: PropTypes.number,
  color: PropTypes.string,
};
