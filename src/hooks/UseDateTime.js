import { useState, useEffect } from 'react';

export const useDateTime = () => {
	const [minute, setMinute] = useState(0);
	const [hour, setHour] = useState(0);
	const [day, setDay] = useState(0);
	const [dayOfMonth, setDayOfMonth] = useState(0);
	const [month, setMonth] = useState(0);
	const [isSchoolDay, setIsSchoolDay] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			const currentDate = new Date();
			const currentMinute = currentDate.getMinutes();
			const currentHour = currentDate.getHours();
			const currentDay = currentDate.getDay();
			const currentDayOfMonth = currentDate.getDate();
			const currentMonth = currentDate.getMonth();
			if (currentMinute !== minute) {
				setMinute(currentMinute);
			}
			if (currentHour !== hour) {
				setHour(currentHour);
			}
			if (currentDay !== day) {
				setDay(currentDay);
				setIsSchoolDay(currentDay !== 0 && currentDayOfMonth !== 6);
			}
			if (currentDayOfMonth !== dayOfMonth) {
				setDayOfMonth(currentDayOfMonth);
			}
			if (currentMonth !== month) {
				setMonth(currentMonth);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [setIsSchoolDay, setMinute, setHour, setDay, setDayOfMonth, setMonth]);

	return { month, dayOfMonth, minute, hour, isSchoolDay };
};
