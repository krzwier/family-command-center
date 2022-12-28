import { Alert, Row, Col } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { PropTypes } from 'prop-types';
import React from 'react';

export const ClaimedReward = ({ 
	color, 
	rewardId,
	dollar, 
	quantity, 
	description, 
	points,
	iconPath, 
}) => {
	const [, drag] = useDrag(() => ({
		type: ItemTypes.CLAIMED_REWARD,
		item: { RewardId: rewardId, color, dollar, quantity, description, points, iconPath },
	}), [rewardId, color, dollar, quantity, description,points, iconPath]);

	return (
		<Alert ref={drag} className={`bg-${color}-dark`}>
			<Row className="justify-content-between">
				<Col xs={2}>
					<img src={iconPath} width="54px" />
				</Col>
				<Col xs={7} className="my-auto">
					<p className="m-0 text-white">
						{dollar ? `$${quantity} ${description}` : `${description} (x${quantity})`}
					</p>
				</Col>
				<Col
					xs={3}
					className="my-auto d-flex flex-row align-items-center justify-content-center"
				>
					<img src="./resources/icons/points.png" width="54px" />
					<h5 className="m-0 text-white">{points}</h5>
				</Col>
			</Row>
		</Alert>
	);
};

ClaimedReward.propTypes = { 
	color: PropTypes.string, 
	rewardId: PropTypes.number,
	dollar: PropTypes.bool, 
	quantity: PropTypes.number, 
	description: PropTypes.string, 
	points: PropTypes.number, 
	iconPath: PropTypes.string,
};