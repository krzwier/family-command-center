import { Alert, Row, Col } from "react-bootstrap";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

export const ClaimedReward = (props) => {
   const { color, dollar, quantity, description, points } = props;
   const [{ opacity }, drag] = useDrag(() => ({
      type: ItemTypes.CLAIMED_REWARD,
      item: { dollar, quantity, description, points },
      collect: (monitor) => ({
         opacity: monitor.isDragging() ? 0.4 : 1
      })
   }));

   return (
      <Alert ref={drag} className={`bg-${color}-dark`}>
         <Row className="justify-content-between">
            <Col xs={2}>
               <img src="./resources/icons/arcade.png" width="100%" />
            </Col>
            <Col xs={7} className="my-auto">
               <p className="m-0 text-white">
                  {dollar ? `\$${quantity} ${description}` : `${description} (x${quantity})`}
               </p>
            </Col>
            <Col
               xs={3}
               className="my-auto d-flex flex-row align-items-center justify-content-center"
            >
               <img src="./resources/icons/points.png" width="54px" />
               <h5 className="m-0 text-white">{points}</h5>
            </Col>
         </Row>
      </Alert>
   );
};
