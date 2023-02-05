import { Offcanvas, Container, Row, Col } from 'react-bootstrap';
import { AvailableRewardBoard } from './AvailableRewardBoard';
import { ClaimedRewardBoard } from './ClaimedRewardBoard';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { ClaimedReward } from './ClaimedReward';
import { AvailableReward } from './AvailableReward';
import { usePreview } from 'react-dnd-preview';
import { ItemTypes } from '../ItemTypes';

export const RewardGhost = () => {
	const { itemType, display, item, style } = usePreview();
	if (!display) {
		return null;
	}
	return (
		<div style={{ ...style, width: 'calc(50% - 90px)', opacity: '50%' }}>
			{itemType === ItemTypes.CLAIMED_REWARD 
				? <ClaimedReward 
					color={item.color} 
					rewardId={item.RewardId} 
					dollar={item.dollar} 
					quantity={item.quantity} 
					description={item.description} 
					points={item.points} 
					iconPath={item.iconPath} 
				/> 
				: <AvailableReward 
					color={item.color} 
					rewardId={item.RewardId} 
					dollar={item.dollar} 
					quantity={item.quantity} 
					description={item.description} 
					points={item.points} 
					iconPath={item.iconPath}/>
			}
		</div>
	);
};


export const RewardPanel = ({ 
	rewardStatus,
	claimReward,
	unClaimReward,
	color,
	show, 
	handleClose, 
}) => {
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
	return (<>
		<Offcanvas
			className={`w-50 bg-${color}-medium`}
			show={show}
			onHide={handleClose}
			placement="end"
		>
			<Offcanvas.Header closeButton />
			<Container fluid className="d-flex flex-column align-items-between" style={{ minHeight: '100%' }}>
				<Row className="d-flex pb-4 justify-content-end" >
					<Col className="my-auto col-12 me-3 d-flex flex-row align-items-center justify-content-end">
						<img src="./resources/Icons/points-dark.png" width="80px" />
						<h1 className="m-0">{rewardStatus.pointBalance}</h1>
					</Col>
				</Row>
				<Row className="d-flex" style={{ minHeight: '90%' }}>
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
			<RewardGhost />
		</Offcanvas>				

	</>
	);
};

RewardPanel.propTypes = { 
	rewardStatus: PropTypes.object,
	claimReward: PropTypes.func,
	unClaimReward: PropTypes.func,
	color: PropTypes.string, 
	show: PropTypes.bool, 
	handleClose: PropTypes.func, 
};