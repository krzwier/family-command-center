import { Offcanvas, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { AvailableRewardBoard } from "./AvailableRewardBoard";
import { ClaimedRewardBoard } from "./ClaimedRewardBoard";
import { ItemTypes } from "../ItemTypes";
import { useState, useCallback } from "react";
import { useRewards } from "../hooks/UseRewards";

export const RewardPanel = (props) => {
   const { personId, color, show, handleClose } = props;
   const {
      rewardStatus: { pointBalance, availableRewards, claimedRewards },
      claimReward,
      unClaimReward
   } = useRewards(personId);

   //    const [availableRewards, setAvailableRewards] = useState([
   //       { dollar: true, quantity: 5, description: "Arcade Money", points: 50 }
   //    ]);
   //    const [claimedRewards, setClaimedRewards] = useState([]);

   const onAvailableDrop = useCallback(
      (reward) => {
         unClaimReward(reward);
      },
      [unClaimReward]
   );

   const onClaimDrop = useCallback(
      (reward) => {
         claimReward(reward);
      },
      [claimRewards]
   );

   return (
      <Offcanvas
         className={`w-50 bg-${color}-medium`}
         show={show}
         onHide={handleClose}
         placement="end"
      >
         <Offcanvas.Header closeButton />

         <Container fluid className="d-flex flex-column align-items-between">
            <Row className="d-flex pb-4 justify-content-end">
               <Col
                  xs="auto"
                  className="my-auto me-3 d-flex flex-row align-items-center justify-content-center"
               >
                  <img src="./resources/icons/points-dark.png" width="80px" />
                  <h1 className="m-0">42</h1>
               </Col>
            </Row>
            <AvailableRewardBoard
               onDrop={onAvailableDrop}
               color={color}
               availableRewards={availableRewards}
            />
            <ClaimedRewardBoard
               onDrop={onClaimDrop}
               color={color}
               claimedRewards={claimedRewards}
            />
         </Container>
      </Offcanvas>
   );
};
