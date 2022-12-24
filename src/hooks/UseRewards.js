import { useState, useEffect, useCallback } from 'react';

export const useRewards = (personId) => {
	const [rewardStatus, setRewardStatus] = useState({
		pointBalance: 0,
		availableRewards: [],
		claimedRewards: [],
		personFound: false,
		success: false,
	});

	useEffect(() => {
		fetch(`http://localhost:4001/rewards/personId=${personId}`)
			.then((response) => response.json())
			.then(setRewardStatus)
			.catch((e) => console.log(e));
	}, [personId, setRewardStatus]);

	const claimReward = useCallback(
		(reward) => {
			fetch(
				`http://localhost:4001/rewards/claim/personId=${personId},rewardId=${reward.RewardId}`,
				{
					method: 'POST',
				},
			)
				.then((response) => {
					return response.json();
				})
				.then(setRewardStatus);
		},
		[personId, setRewardStatus],
	);

	const unClaimReward = useCallback(
		(reward) => {
			fetch(
				`http://localhost:4001/rewards/unclaim/personId=${personId},rewardId=${reward.RewardId}`,
				{
					method: 'POST',
				},
			)
				.then((response) => {
					return response.json();
				})
				.then(setRewardStatus);
		},
		[personId, setRewardStatus],
	);

	return { 
		rewardStatus,
		claimReward, 
		unClaimReward, 
	};
};
