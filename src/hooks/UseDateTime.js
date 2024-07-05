import { useState, useEffect } from 'react';

export const useDateTime = () => {
	const [hour, setHour] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			const currentDate = new Date();
			const currentHour = currentDate.getHours();
			if (currentHour !== hour) {
				setHour(currentHour);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [  setHour]);

	return { hour };
};
