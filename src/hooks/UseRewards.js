import { useState, useEffect, useCallback } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const useRewards = (personId) => {
	const [rewardStatus, setRewardStatus] = useState({
		PointBalance: 0,
		AvailableRewards: [],
		ClaimedRewards: [],
	});

	const fetchRewards = useCallback(
		async () => { 
			return await callFunction(`getrewards/personid=${personId}`);
		}, [personId, setRewardStatus],
	);

	useEffect(() => {
		fetchRewards().then(setRewardStatus);
	}, [fetchRewards, setRewardStatus]);

	const claimReward = useCallback(
		async (reward) => {
			await callFunction(`claimreward/personid=${personId},rewardid=${reward.RewardId}`);
			const rewardStatus = await fetchRewards();
			setRewardStatus(rewardStatus);
		}, [personId, fetchRewards],
	);

	const unClaimReward = useCallback(
		async (reward) => {
			await callFunction(`unclaimreward/personid=${personId},rewardid=${reward.RewardId}`);
			const rewardStatus = await fetchRewards();
			setRewardStatus(rewardStatus);
		}, [personId, fetchRewards],
	);

	const incrementPointBalance = useCallback(
		async () => {
			await callFunction(`incrementpointbalance/personid=${personId}`);
			const rewardStatus = await fetchRewards();
			setRewardStatus(rewardStatus);
		},
		[personId, fetchRewards]);

	const decrementPointBalance = useCallback(
		async () => {
			await callFunction(`decrementpointbalance/personid=${personId}`);
			const rewardStatus = await fetchRewards();
			setRewardStatus(rewardStatus);
		}, [personId, fetchRewards]);

	return { 
		rewardStatus,
		claimReward, 
		unClaimReward, 
		incrementPointBalance,
		decrementPointBalance,
	};
};
