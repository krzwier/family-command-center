import { usePerson } from "../hooks/UsePerson";
import { useMoney } from "../hooks/UseMoney";
import { DateTime } from "./DateTime";
// import { useDateTime } from "../hooks/UseDateTime";
// import { Greeting } from "./Greeting";
import { RoutineList } from "./RoutineList";
// import { Container, Row, Col } from "react-bootstrap";
import {
  Grid,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
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
  const [currentComponent, setCurrentComponent] = useState("Routines");
  const [showRewardPanel, setShowRewardPanel] = useState(false);
  const person = usePerson(personId);
  const moneyBalance = useMoney(personId);
  const {
    rewardStatus,
    claimReward,
    unClaimReward,
    incrementPointBalance,
    decrementPointBalance,
  } = useRewards(personId);

  const handleCloseRewardPanel = useCallback(
    () => setShowRewardPanel(false),
    [setShowRewardPanel]
  );

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
              color={color}
              show={showRewardPanel}
              handleClose={handleCloseRewardPanel}
            />
          </DndProvider>
        );
      default:
        return <></>;
    }
  }, [currentComponent]);

  return (
    <Grid container height="calc(100vh - 109.5px)">
      <DateTime title={person.PersonName} subtitle={currentComponent} />
      <Grid container height="calc(100% - 180px)" justifyContent="center">
        {getCurrentComponent()}
      </Grid>
      {/* <Grid
        container
        width="100vh"
        // height="100px"
        // justifyContent="end"
        padding={3}
      > */}
      <SpeedDial
        ariaLabel="Dashboard actions"
        sx={{ position: "absolute", bottom: "140.5px", right: "36px" }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              setCurrentComponent(action.name);
            }}
          />
        ))}
      </SpeedDial>
    </Grid>
    // </Grid>
  );
  //   <Row className="fixed-bottom justify-content-end">
  //     <Col
  //       xs="auto"
  //       className={`tracker d-flex flex-row py-3 bg-${color}-dark align-items-center justify-content-center`}
  //       onClick={() => setShowRewardPanel(!showRewardPanel)}
  //     >
  //       <img src="./resources/Icons/points.png" width="80px" />
  //       <h4 className={`text-white m-0`}>{rewardStatus.PointBalance}</h4>
  //     </Col>
  //     <Col
  //       xs="auto"
  //       className="tracker d-flex flex-row bg-dark-gray align-items-center justify-content-center"
  //     >
  //       <img src="./resources/Icons/money.png" width="80px" />
  //       <h4 className={`text-white ps-3 m-0`}>{`$${moneyBalance.toFixed(
  //         2
  //       )}`}</h4>
  //     </Col>
  //   </Row>

  // </Container>
  //   );
};

PersonalDashboard.propTypes = {
  personId: PropTypes.number,
  color: PropTypes.string,
};
