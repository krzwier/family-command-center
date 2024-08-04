import { useTasks } from '../hooks/UseTasks';
import { useState, useEffect } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { PropTypes } from 'prop-types';
import {
	Accordion,
	AccordionDetails,
	Card,
	CardHeader,
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemAvatar,
	ListItemText,
	Divider,
} from '@mui/material';
import React from 'react';

export const Routine = ({
	routine,
	incrementPointBalance,
	decrementPointBalance,
}) => {
	const { tasks, toggleTaskCompletion, listIsComplete } = useTasks(
		routine.RoutineId,
		incrementPointBalance,
		decrementPointBalance,
		routine.IsCompleted,
	);
	const [expanded, setExpanded] = useState(!listIsComplete);

	useEffect(() => {
		if (listIsComplete) {
			setExpanded(false);
		}
	}, [listIsComplete]);

	return (
		<Accordion component={Card} expanded={expanded}>
			<CardHeader
				sx={{ padding: 4 }}
				avatar={<img src={routine.IconPath} height="50px" />}
				title={routine.RoutineDisplayName}
				onClick={() => setExpanded(!expanded)}
				action={
					<Checkbox
						checked={listIsComplete}
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<TaskAltIcon />}
						size="large"
					/>
				}
			/>
			<AccordionDetails>
				<Divider />
				<List sx={{ paddingX: 0 }}>
					{tasks.map((task) => {
						const labelId = `input-routine${routine.RoutineId}task${task.TaskId}`;
						return (
							<ListItem
								sx={{ paddingX: 0 }}
								key={task.TaskId}
								secondaryAction={
									<Checkbox
										edge="end"
										key={task.TaskId}
										onChange={() => toggleTaskCompletion(task.TaskId)}
										checked={task.completed}
										size="large"
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								}
								// disablePadding
							>
								<ListItemButton
									onClick={() => toggleTaskCompletion(task.TaskId)}
								>
									<ListItemAvatar sx={{ paddingRight: 3 }}>
										<img src={task.IconPath} height="50px" />
									</ListItemAvatar>
									<ListItemText
										sx={{ fontSize: '20px' }}
										id={labelId}
										primary={task.TaskDescription}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</AccordionDetails>
		</Accordion>
	);
};

Routine.propTypes = {
	routine: PropTypes.object,
	color: PropTypes.string,
	incrementPointBalance: PropTypes.func,
	decrementPointBalance: PropTypes.func,
};
