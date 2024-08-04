import { useDrop } from 'react-dnd';
import { AvailableReward } from './AvailableReward';
import { ItemTypes } from '../ItemTypes';
import { Card, CardHeader, CardContent, Stack } from '@mui/material';

import { PropTypes } from 'prop-types';
import React from 'react';

export const AvailableRewardBoard = ({ onDrop, color, availableRewards }) => {
	const [, drop] = useDrop({
		accept: ItemTypes.CLAIMED_REWARD,
		drop: onDrop,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<Card ref={drop}>
			<CardHeader title="Available Rewards" />
			<CardContent>
				<Stack spacing={3}>
					{availableRewards.map((reward) => (
						<AvailableReward
							key={reward.RewardId}
							color={color}
							rewardId={reward.RewardId}
							dollar={reward.Money}
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

AvailableRewardBoard.propTypes = {
	onDrop: PropTypes.func,
	color: PropTypes.string,
	availableRewards: PropTypes.array,
};
