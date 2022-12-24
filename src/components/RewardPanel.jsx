import { Offcanvas, Container, Row, Col } from 'react-bootstrap';
import { AvailableRewardBoard } from './AvailableRewardBoard';
import { ClaimedRewardBoard } from './ClaimedRewardBoard';
import { useRewards } from '../hooks/UseRewards';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';

export const RewardPanel = ({ 
	personId, 
	color, 
	show, 
	handleClose, 
}) => {
	const { rewardStatus, claimReward, unClaimReward } = useRewards(personId);
	const onAvailableDrop = useCallback(
		(reward) => {
			unClaimReward(reward);
		},
		[unClaimReward],
	);

	const onClaimDrop = useCallback(
		(reward) => {
			claimReward(reward);
		},
		[claimReward],
	);

	if (!rewardStatus.personFound) {
		return <></>;
	}
	return (
		<Offcanvas
			className={`w-50 bg-${color}-medium`}
			show={show}
			onHide={handleClose}
			placement="end"
		>
			<Offcanvas.Header closeButton />
			<Container className="d-flex align-items-between">
				<Row className="d-flex pb-4 justify-content-end">
					<Col className="my-auto col-12 me-3 d-flex flex-row align-items-center justify-content-end">
						<img src="./resources/icons/points-dark.png" width="80px" />
						<h1 className="m-0">{rewardStatus.pointBalance}</h1>
					</Col>
					<Col className="col-12 mt-4">
						<AvailableRewardBoard
							onDrop={onAvailableDrop}
							color={color}
							availableRewards={rewardStatus.availableRewards}
						/>
						<ClaimedRewardBoard
							onDrop={onClaimDrop}
							color={color}
							claimedRewards={rewardStatus.claimedRewards}
						/>
					</Col>
				</Row>
			</Container>
		</Offcanvas>
	);
};

RewardPanel.propTypes = { 
	personId: PropTypes.number, 
	color: PropTypes.string, 
	show: PropTypes.bool, 
	handleClose: PropTypes.func, 
};