import { Alert, Row, Col } from "react-bootstrap";

export const AvailableReward = (props) => {
   const { color, description, points } = props;

   return (
      <Alert className={`bg-${color}-light`}>
         <Row className="justify-content-between">
            <Col xs={2}>
               <img src="./resources/icons/arcade.png" width="100%" />
            </Col>
            <Col xs={7} className="my-auto">
               <h5 className="m-0">{description}</h5>
            </Col>
            <Col
               xs={3}
               className="my-auto d-flex flex-row align-items-center justify-content-center"
            >
               <img src="./resources/icons/points-dark.png" width="54px" />
               <h5 className="m-0">{points}</h5>
            </Col>
         </Row>
      </Alert>
   );
};
