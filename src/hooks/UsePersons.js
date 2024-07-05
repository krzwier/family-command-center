import { useState, useEffect } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const usePersons = () => {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		callFunction('getallpersons')
			.then(setPersons);
	}, [setPersons]);

	return persons;
};
