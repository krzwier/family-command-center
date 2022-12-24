import { useState, useEffect } from 'react';

export const useRoutines = (personId, hour, isSchoolDay) => {
	const [routines, setRoutines] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		fetch(
			`http://localhost:4001/routines/person=${personId},hour=${hour},isSchoolDay=${
				isSchoolDay ? 1 : 0
			}`,
			{
				signal: controller.signal,
			},
		)
			.then((response) => response.json())
			.then((data) => setRoutines(data.routines))
			.catch(() => {
				setRoutines([]);
			});
		return () => controller.abort();
	}, [personId, hour, isSchoolDay]);

	return routines;
};
