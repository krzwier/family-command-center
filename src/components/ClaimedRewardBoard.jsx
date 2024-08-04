import { useDrop } from 'react-dnd';
import { ClaimedReward } from './ClaimedReward';
import { ItemTypes } from '../ItemTypes';
import { Card, CardHeader, CardContent, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import React from 'react';

export const ClaimedRewardBoard = ({ color, onDrop, claimedRewards }) => {
	const [, drop] = useDrop({
		accept: ItemTypes.AVAILABLE_REWARD,
		drop: onDrop,
	});

	return (
		<Card ref={drop}>
			<CardHeader title="Claimed Rewards" />
			<CardContent>
				<Stack spacing={3} sx={{ minHeight: '400px' }}>
					{claimedRewards.map((reward) => (
						<ClaimedReward
							key={reward.RewardId}
							color={color}
							rewardId={reward.RewardId}
							dollar={reward.Money == 1}
							quantity={reward.Quantity}
							description={reward.Description}
							points={reward.Points}
							iconPath={reward.IconPath}
						/>
					))}
				</Stack>
			</CardContent>
		</Card>
	);
};

ClaimedRewardBoard.propTypes = {
	color: PropTypes.string,
	onDrop: PropTypes.func,
	claimedRewards: PropTypes.array,
};
