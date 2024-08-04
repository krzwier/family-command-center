import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { PropTypes } from 'prop-types';
import { Card, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react';

export const AvailableReward = ({
	rewardId,
	dollar,
	quantity,
	description,
	points,
	iconPath,
}) => {
	const [, drag] = useDrag(
		() => ({
			type: ItemTypes.AVAILABLE_REWARD,
			item: {
				RewardId: rewardId,
				dollar,
				quantity,
				description,
				points,
				iconPath,
			},
		}),
		[rewardId, dollar, quantity, description, points, iconPath],
	);

	return (
		<Card ref={drag}>
			<CardHeader
				className="reward"
				avatar={<img src={iconPath} width="54px" />}
				title={dollar ? `$${quantity} ${description}` : `${description}`}
				action={
					<Grid container alignItems="center">
						<img src="./resources/Icons/points.png" width="54px" />
						<Typography variant="h4">{points}</Typography>
					</Grid>
				}
			/>
		</Card>
	);
};

AvailableReward.propTypes = {
	rewardId: PropTypes.number,
	dollar: PropTypes.bool,
	quantity: PropTypes.number,
	description: PropTypes.string,
	points: PropTypes.number,
	iconPath: PropTypes.string,
};
