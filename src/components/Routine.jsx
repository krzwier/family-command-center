import { Row, Col, Collapse } from 'react-bootstrap';
import { useTasks } from '../hooks/UseTasks';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { PropTypes } from 'prop-types';
import React from 'react';

export const Routine = ({ 
	routine, 
	color, 
	incrementPointBalance, 
	decrementPointBalance, 
}) => {
	const { tasks, toggleTaskCompletion, listIsComplete } = useTasks(
		routine.RoutineId,
		incrementPointBalance,
		decrementPointBalance,
		Boolean(routine.Completed),
	);
	const [expanded, setExpanded] = useState(!listIsComplete);

	useEffect(() => {
		if (listIsComplete) {
			setExpanded(false);
		}
	}, [listIsComplete]);

	return (
		<Row className="justify-content-center mb-5">
			<Col xs={8} className={`bg-${color}-dark routine-box p-3`}>
				<Row className="justify-content-between p-3" onClick={() => setExpanded(!expanded)}>
					<Col xs="auto">
						<Row>
							<Col xs="auto">
								<img src={routine.IconPath} height="50px" />
							</Col>
							<Col xs="auto">
								<h6 className="display-6 text-mint-cream text-center">
									{routine.RoutineDisplayName}
								</h6>
							</Col>
						</Row>
					</Col>
					<Col xs="auto">
						{listIsComplete ? (
							<FontAwesomeIcon
								className="display-6 text-white pt-1"
								icon={faCircleCheck}
							/>
						) : (
							<FontAwesomeIcon
								className="display-6 text-white pt-1"
								icon={faCircle}
							/>
						)}
					</Col>
				</Row>
				<Collapse in={expanded}>
					<div>
						<Row className="ks-cboxtags">
							<Col>
								{tasks.map((task) => (
									<Row
										key={`routine${routine.RoutineId}task${task.TaskId}`}
										className="py-1 task"
									>
										<input
											type="checkbox"
											id={`routine${routine.RoutineId}task${task.TaskId}`}
											value={task.TaskId}
											className="w-25"
											checked={task.completed}
											onChange={(event) =>
												toggleTaskCompletion(
													parseInt(
														event.target.id.substring(
															event.target.id.indexOf('task') + 4,
														),
													),
												)
											}
										/>
										<label
											htmlFor={`routine${routine.RoutineId}task${task.TaskId}`}
											className="taskDescription"
										>
											<img
												src={task.IconPath}
												height="50px"
												className="pe-4"
											/>
											{task.TaskDescription}
										</label>
									</Row>
								))}
							</Col>
						</Row>
					</div>
				</Collapse>
			</Col>
		</Row>
	);
};

Routine.propTypes = { 
	routine: PropTypes.object, 
	color: PropTypes.string, 
	incrementPointBalance: PropTypes.func, 
	decrementPointBalance: PropTypes.func, 
};