import { useRoutines } from '../hooks/UseRoutines';
import { Routine } from './Routine';
import { PropTypes } from 'prop-types';
import React from 'react';

export const RoutineList = ({ 
	personId, 
	color, 
	incrementPointBalance, 
	decrementPointBalance, 
}) => {
	const routines = useRoutines(personId);
	console.log(routines);

	return routines.map((routine) => (
		<Routine
			key={routine.RoutineId}
			routine={routine}
			color={color}
			incrementPointBalance={incrementPointBalance}
			decrementPointBalance={decrementPointBalance}
		/>
	));
};

RoutineList.propTypes = { 
	personId: PropTypes.number, 
	color: PropTypes.string, 
	incrementPointBalance: PropTypes.func, 
	decrementPointBalance: PropTypes.func, 
};