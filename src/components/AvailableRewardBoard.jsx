import { useDrop } from 'react-dnd';
import { AvailableReward } from './AvailableReward';
import { ItemTypes } from '../ItemTypes';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import React from 'react';

export const AvailableRewardBoard = ({ onDrop, color, availableRewards } ) => {
	const [, drop] = useDrop({
		accept: ItemTypes.CLAIMED_REWARD,
		drop: onDrop,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<Card ref={drop} className={`mx-2 mb-5 p-2 bg-${color}-light`} style={{ minHeight: '75%' }}>
			<Card.Title className="p-3">Available Rewards</Card.Title>
			<Card.Body>
				{availableRewards.map((reward) => (
					<AvailableReward
						key={reward.RewardId}
						color={color}
						rewardId={reward.RewardId}
						dollar={reward.Money === 1}
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

AvailableRewardBoard.propTypes = { 
	onDrop: PropTypes.func, 
	color: PropTypes.string, 
	availableRewards: PropTypes.array, 
}; 
