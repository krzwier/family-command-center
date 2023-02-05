import { useState, useEffect, useCallback } from 'react';

export const useRewards = (personId) => {
	const [rewardStatus, setRewardStatus] = useState({
		pointBalance: null,
		availableRewards: null,
		claimedRewards: null,
		personFound: false,
		success: false,
	});

	const fetchRewards = useCallback(() => {
		fetch(`http://localhost:4001/rewards/personId=${personId}`)
			.then((response) => response.json())
			.then(setRewardStatus)
			.catch((e) => console.log(e));
	}, [personId, setRewardStatus]);

	useEffect(fetchRewards, [fetchRewards]);

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

	const incrementPointBalance = useCallback(() => {
		fetch(`http://localhost:4001/pointBalance/increment/personId=${personId}`, {
			method: 'POST',
		})
			.then(fetchRewards);
	}, [personId, fetchRewards]);

	const decrementPointBalance = useCallback(() => {
		fetch(`http://localhost:4001/pointBalance/decrement/personId=${personId}`, {
			method: 'POST',
		})
			.then(fetchRewards);
	}, [personId, fetchRewards]);

	return { 
		rewardStatus,
		claimReward, 
		unClaimReward, 
		incrementPointBalance,
		decrementPointBalance,
	};
};
