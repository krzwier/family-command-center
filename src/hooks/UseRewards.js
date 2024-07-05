import { useState, useEffect, useCallback } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const useRewards = (personId) => {
	const [rewardStatus, setRewardStatus] = useState({
		PointBalance: 0,
		AvailableRewards: [],
		ClaimedRewards: [],
	});

	const fetchRewards = useCallback(
		() => {
			callFunction(`getrewards/personid=${personId}`)
				.then(setRewardStatus);
		}, 
		[personId, setRewardStatus]);

	useEffect(fetchRewards, [fetchRewards]);

	const claimReward = useCallback(
		(reward) => 
			callFunction(`claimreward/personid=${personId},rewardid=${reward.RewardId}`)
				.then(() => callFunction(`getrewards/personid=${personId}`))
				.then((response) => response.json())
				.then(setRewardStatus),
		[personId, setRewardStatus],
	);

	const unClaimReward = useCallback(
		(reward) => 
			callFunction(`unclaimreward/personid=${personId},rewardid=${reward.RewardId}`)
				.then(() => callFunction(`getrewards/personid=${personId}`))
				.then((response) => response.json())
				.then(setRewardStatus),
		[personId, setRewardStatus],
	);

	const incrementPointBalance = useCallback(
		() => callFunction(`incrementpointbalance/personid=${personId}`)
			.then(fetchRewards), 
		[personId, fetchRewards]);

	const decrementPointBalance = useCallback(
		() => callFunction(`decrementpointbalance/personid=${personId}`)
			.then(fetchRewards),
		[personId, fetchRewards]);

	return { 
		rewardStatus,
		claimReward, 
		unClaimReward, 
		incrementPointBalance,
		decrementPointBalance,
	};
};
