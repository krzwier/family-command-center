import { Offcanvas, Container, Row, Col, Alert } from "react-bootstrap";
import { AvailableReward } from "./AvailableReward";
import { useDrop } from "react-dnd";
import { AvailableRewardBoard } from "./AvailableRewardBoard";
import { ItemTypes } from "../ItemTypes";
import { useState } from "react";

export const RewardPanel = (props) => {
   const { color, show, handleClose } = props;
   const [availableRewardBoardAccept, setAvailableRewardBoardAccept] = useState({
      accept: [ItemTypes.REWARD]
   });

   const onDrop = () => {
      console.log("Just dropped an item");
   };

   return (
      <Offcanvas
         className={`w-50 bg-${color}-medium`}
         show={show}
         onHide={handleClose}
         placement="end"
      >
         <Offcanvas.Header closeButton />

         <Container className="d-flex flex-column align-items-between max-height">
            <Row className="d-flex justify-content-end">
               <Col
                  xs="auto"
                  className="my-auto me-3 d-flex flex-row align-items-center justify-content-center"
               >
                  <img src="./resources/icons/points-dark.png" width="80px" />
                  <h1 className="m-0">42</h1>
               </Col>
            </Row>
            <Row className="mx-3 my-4">
               <AvailableRewardBoard accept={availableRewardBoardAccept} onDrop={onDrop} />
            </Row>
            <Row className="mx-3 my-4">
               <h2 className="ps-1 pb-4">Rewards you've claimed:</h2>
            </Row>
         </Container>
      </Offcanvas>
   );
};
