import { useState, useEffect } from 'react';

export const usePersons = () => {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4001/persons/')
			.then((response) => response.json())
			.then((data) => setPersons(data.persons));
	}, []);

	return persons;
};
