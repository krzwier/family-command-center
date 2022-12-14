import { usePerson } from '../hooks/UsePerson';
import { useMoney } from '../hooks/UseMoney';
import { usePoints } from '../hooks/UsePoints';
import { useDateTime } from '../hooks/UseDateTime';
import { DateTime } from './DateTime';
import { Greeting } from './Greeting';
import { RoutineList } from './RoutineList';
import { Container, Row, Col } from 'react-bootstrap';
import { RewardPanel } from './RewardPanel';
import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { usePreview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';
import { PropTypes } from 'prop-types';
import React from 'react';
// import HTML5ToTouch from '../HTML5ToTouch';
// import { ItemTypes } from '../ItemTypes';
// import { AvailableReward } from './AvailableReward';
// import { ClaimedReward } from './ClaimedReward';

// const RewardGhost = () => {
// 	const { itemType, display, item } = usePreview();
// 	if (!display) {
// 		return null;
// 	}
// 	return itemType === ItemTypes.CLAIMED_REWARD 
// 		? <ClaimedReward color={item.color} rewardId={item.RewardId} dollar={item.dollar} quantity={item.quantity} description={item.description} points={item.points} iconPath={item.iconPath} /> 
// 		: <AvailableReward />;
// 	// <div className="item-list__item" style={style}>{itemType}</div>;
// };

export const PersonalDashboard = ({ personId, color }) => {
	const [showRewardPanel, setShowRewardPanel] = useState(false);
	const person = usePerson(personId);
	const moneyBalance = useMoney(personId);
	const { 
		pointBalance, 
		incrementPointBalance, 
		decrementPointBalance, 
	} = usePoints(personId);
	const { date, hour, isSchoolDay } = useDateTime();

	const handleCloseRewardPanel = useCallback(
		() => setShowRewardPanel(false),
		[setShowRewardPanel],
	);

	return (
		<>
			<Container fluid>
				<DateTime date={date} />
				<Greeting personName={person.PersonName} date={date} />
				<RoutineList
					key={personId}
					personId={personId}
					color={color}
					hour={hour}
					isSchoolDay={isSchoolDay}
					incrementPointBalance={incrementPointBalance}
					decrementPointBalance={decrementPointBalance}
				/>
				<Row className="fixed-bottom justify-content-end">
					{pointBalance === 'no account' ? (
						<></>
					) : (
						<Col
							xs="auto"
							className={`tracker d-flex flex-row py-3 bg-${color}-dark align-items-center justify-content-center`}
							onClick={() => setShowRewardPanel(!showRewardPanel)}
						>
							<img src="./resources/Icons/points.png" width="80px" />
							<h4 className={`text-white m-0`}>{pointBalance}</h4>
						</Col>
					)}
					{moneyBalance === 'no account' ? (
						<></>
					) : (
						<Col
							xs="auto"
							className="tracker d-flex flex-row bg-dark-gray align-items-center justify-content-center"
						>
							<img src="./resources/Icons/money.png" width="80px" />
							<h4 className={`text-white ps-3 m-0`}>{`$${moneyBalance.toFixed(
								2,
							)}`}</h4>
						</Col>
					)}
				</Row>
				<DndProvider backend={TouchBackend}>
					<RewardPanel
						personId={personId}
						color={color}
						show={showRewardPanel}
						handleClose={handleCloseRewardPanel}
					/>
					{/* <RewardGhost /> */}
				</DndProvider>
			</Container>
		</>
	);
};

PersonalDashboard.propTypes = {
	personId: PropTypes.number, 
	color: PropTypes.string,
};