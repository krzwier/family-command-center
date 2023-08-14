import React, { useEffect, useState } from 'react';
import  FullCalendar from '@fullcalendar/react';
import { DateTime } from './DateTime';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import iCalendarPlugin from '@fullcalendar/icalendar';
import fetch from 'node-fetch';

export const MainDashboard = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:4001/workEvents').then(() => setIsLoading(false));
        
	}, []);


	return (
		<><DateTime />
			{!isLoading && 
			<FullCalendar
				plugins={[ timeGridPlugin, googleCalendarPlugin, iCalendarPlugin]}
				eventSources={[
					{ googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_PERSONAL_CALENDAR_ID, backgroundColor: 'purple' },
					{ googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_FAMILY_CALENDAR_ID, backgroundColor: 'blue' },
					{ 
						url: './resources/workCalendar.ics',
						color: 'green',
						format: 'ics',
					},
				]}
        
				eventClick={(info) => info.jsEvent.preventDefault()}
				initialView="timeGridWeek"
				eventMinHeight={60}
				slotMinTime="6:00:00"
				slotMaxTime="22:00:00"
				themeSystem="standard"
				weekends={true}
			/>
			}
		</>
	);
};