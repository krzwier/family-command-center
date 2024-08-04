import { useRoutines } from '../hooks/UseRoutines';
import { Routine } from './Routine';
import { PropTypes } from 'prop-types';
import { Stack, Grid } from '@mui/material';
import React from 'react';

export const RoutineList = ({
	personId,
	color,
	incrementPointBalance,
	decrementPointBalance,
}) => {
	const routines = useRoutines(personId);

	return (
		<Grid container justifyContent="center" height="calc(100% - 180px)">
			<Stack spacing={5} width="60%">
				{routines.map((routine) => (
					<Routine
						key={routine.RoutineId}
						routine={routine}
						color={color}
						incrementPointBalance={incrementPointBalance}
						decrementPointBalance={decrementPointBalance}
					/>
				))}
			</Stack>
		</Grid>
	);
};

RoutineList.propTypes = {
	personId: PropTypes.number,
	color: PropTypes.string,
	incrementPointBalance: PropTypes.func,
	decrementPointBalance: PropTypes.func,
};
