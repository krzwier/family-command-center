import { useState, useEffect } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const usePerson = (personId) => {
	const [person, setPerson] = useState({ personName: '' });

	useEffect(() => {
		callFunction(`getperson/personid=${personId}`)
			.then((persons) => setPerson(persons[0]));
	}, [personId, setPerson]);

	return person;
};
