import { useDrop } from "react-dnd";
import { AvailableReward } from "./AvailableReward";
import { ItemTypes } from "../ItemTypes";
import { Card } from "react-bootstrap";

export const AvailableRewardBoard = (props) => {
   const { onDrop, color, availableRewards } = props;
   const [{ isOver, canDrop }, drop] = useDrop({
      accept: ItemTypes.CLAIMED_REWARD,
      drop: onDrop,
      collect: (monitor) => ({
         isOver: monitor.isOver(),
         canDrop: monitor.canDrop()
      })
   });

   return (
      <Card ref={drop} className={`mx-2 mb-5 p-2 bg-${color}-light`}>
         <Card.Title className="p-3">Available Rewards</Card.Title>
         <Card.Body>
            {availableRewards.map((reward, index) => (
               <AvailableReward
                  key={index}
                  color={color}
                  dollar={reward.dollar}
                  quantity={reward.quantity}
                  description={reward.description}
                  points={reward.points}
               />
            ))}
         </Card.Body>
      </Card>
   );
};
