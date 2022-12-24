import { useRoutines } from '../hooks/UseRoutines';
import { Routine } from './Routine';
import { PropTypes } from 'prop-types';
import React from 'react';

export const RoutineList = ({ 
	personId, 
	color, 
	hour, 
	incrementPointBalance, 
	decrementPointBalance, 
	isSchoolDay, 
}) => {
	const routines = useRoutines(personId, hour, isSchoolDay);

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
	hour: PropTypes.number, 
	incrementPointBalance: PropTypes.func, 
	decrementPointBalance: PropTypes.func, 
	isSchoolDay: PropTypes.bool, 
};