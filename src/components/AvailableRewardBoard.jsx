export const AvailableRewardBoard = (accept, onDrop) => {
   const [drop] = useDrop({
      accept,
      drop: onDrop
   });

   return (
      <div ref={drop}>
         <h2 className="ps-1 pb-4">Available Rewards:</h2>
         <AvailableReward color={color} description="$5 Arcade Money" points={50} />
      </div>
   );
};
