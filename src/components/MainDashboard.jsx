/* eslint-disable no-undef */
import React from 'react';
import  FullCalendar from '@fullcalendar/react';
import { DateTime } from './DateTime';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import iCalendarPlugin from '@fullcalendar/icalendar';

export const MainDashboard = () => {
	return (
		<>
			<DateTime />
			<FullCalendar
				plugins={[ timeGridPlugin, googleCalendarPlugin, iCalendarPlugin]}
				eventSources={[
					{ 
						googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_PERSONAL_CALENDAR_ID, 
						backgroundColor: '#A67EC9E6', 
					},
					{ 
						googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_FAMILY_CALENDAR_ID, 
						backgroundColor: '#6B92D6E6', 
					},
					{ 
						googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_PRIMARY_WORK_CALENDAR_ID, 
						backgroundColor: 'pink', 
					},
					{ 
						googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
						googleCalendarId: process.env.REACT_APP_SECONDARY_WORK_CALENDAR_ID, 
						backgroundColor: 'green', 
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
		</>
	);
};