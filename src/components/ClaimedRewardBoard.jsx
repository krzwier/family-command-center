import { useDrop } from 'react-dnd';
import { ClaimedReward } from './ClaimedReward';
import { ItemTypes } from '../ItemTypes';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import React from 'react';

export const ClaimedRewardBoard = ({ 
	color, 
	onDrop, 
	claimedRewards, 
}) => {
	const [, drop] = useDrop({
		accept: ItemTypes.AVAILABLE_REWARD,
		drop: onDrop,
	});

	return (
		<Card ref={drop} className={`mx-2 p-2 bg-${color}-light`} style={{ minHeight: '30%' }}>
			<Card.Title className="p-3">Claimed Rewards</Card.Title>
			<Card.Body>
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
			</Card.Body>
		</Card>
	);
};

ClaimedRewardBoard.propTypes = { 
	color: PropTypes.string, 
	onDrop: PropTypes.func, 
	claimedRewards: PropTypes.array, 
};