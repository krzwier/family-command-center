import { useState, useEffect } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const useRoutines = (personId) => {
	const [routines, setRoutines] = useState([]);

	useEffect(() => {
		callFunction(`getroutines/personid=${personId}`)
			.then(setRoutines);
	},	[personId, setRoutines]);

	return routines;
};
