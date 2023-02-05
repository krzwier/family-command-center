import { usePerson } from '../hooks/UsePerson';
import { useMoney } from '../hooks/UseMoney';
import { useDateTime } from '../hooks/UseDateTime';
import { DateTime } from './DateTime';
import { Greeting } from './Greeting';
import { RoutineList } from './RoutineList';
import { Container, Row, Col } from 'react-bootstrap';
import { RewardPanel } from './RewardPanel';
import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useRewards } from '../hooks/UseRewards';


export const PersonalDashboard = ({ personId, color }) => {
	const [showRewardPanel, setShowRewardPanel] = useState(false);
	const person = usePerson(personId);
	const moneyBalance = useMoney(personId);
	const  {
		rewardStatus,
		claimReward, 
		unClaimReward, 
		incrementPointBalance,
		decrementPointBalance,
	} = useRewards(personId);
	const { date, hour, isSchoolDay } = useDateTime();

	const handleCloseRewardPanel = useCallback(
		() => setShowRewardPanel(false),
		[setShowRewardPanel],
	);

	return  (
		<Container fluid>
			<DateTime date={date} />
			<Greeting personName={person.PersonName} date={date} />
			{rewardStatus.personFound && (
				<>
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
						<Col
							xs="auto"
							className={`tracker d-flex flex-row py-3 bg-${color}-dark align-items-center justify-content-center`}
							onClick={() => setShowRewardPanel(!showRewardPanel)}
						>
							<img src="./resources/Icons/points.png" width="80px" />
							<h4 className={`text-white m-0`}>{rewardStatus.pointBalance}</h4>
						</Col>
						<Col
							xs="auto"
							className="tracker d-flex flex-row bg-dark-gray align-items-center justify-content-center"
						>
							<img src="./resources/Icons/money.png" width="80px" />
							<h4 className={`text-white ps-3 m-0`}>{`$${moneyBalance.toFixed(
								2,
							)}`}</h4>
						</Col>
					</Row>
					<DndProvider backend={TouchBackend}>
						<RewardPanel
							rewardStatus={rewardStatus}
							claimReward={claimReward}
							unClaimReward={unClaimReward}
							color={color}
							show={showRewardPanel}
							handleClose={handleCloseRewardPanel}
						/>
					</DndProvider>
				</>
			)}
		</Container>
	);
};

PersonalDashboard.propTypes = {
	personId: PropTypes.number, 
	color: PropTypes.string,
};