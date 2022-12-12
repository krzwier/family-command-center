import { useState, useEffect, useCallback } from "react";

export const useRewards = (personId) => {
   const [rewardStatus, setRewardStatus] = useState();
   // todo: normalize rewardStatus response so that error codes or people without accounts don't mess up the needed fields
   useEffect(() => {
      fetch(`http://localhost:4001/rewards/personId=${personId}`)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setRewardStatus(data);
         });
   }, [personId]);

   const claimReward = useCallback(
      (reward) => {
         fetch(
            `http://localhost:4001/rewards/claim/personId=${personId},rewardId=${reward.RewardId}`,
            {
               method: "POST"
            }
         )
            .then((response) => {
               return response.json();
            })
            .then(setRewardStatus);
      },
      [personId, setRewardStatus]
   );

   const unClaimReward = useCallback(
      (reward) => {
         fetch(
            `http://localhost:4001/rewards/unclaim/personId=${personId},rewardId=${reward.RewardId}`,
            {
               method: "POST"
            }
         )
            .then((response) => {
               return response.json();
            })
            .then(setRewardStatus);
      },
      [personId, setRewardStatus]
   );

   return { rewardStatus, claimReward, unClaimReward };
};
