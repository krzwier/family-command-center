import { useDrop } from "react-dnd";
import { ClaimedReward } from "./ClaimedReward";
import { ItemTypes } from "../ItemTypes";
import { Card } from "react-bootstrap";

export const ClaimedRewardBoard = (props) => {
   const { color, onDrop, claimedRewards } = props;

   const [{ isOver, canDrop }, drop] = useDrop({
      accept: ItemTypes.AVAILABLE_REWARD,
      drop: onDrop,
      collect: (monitor) => ({
         isOver: monitor.isOver(),
         canDrop: monitor.canDrop()
      })
   });

   return (
      <Card ref={drop} className={`mx-2 p-2 bg-${color}-light`}>
         <Card.Title className="p-3">Claimed Rewards</Card.Title>
         <Card.Body>
            {claimedRewards.map((reward, index) => (
               <ClaimedReward
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
