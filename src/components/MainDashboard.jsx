import React from 'react';
import  FullCalendar from '@fullcalendar/react';
import { DateTime } from './DateTime';
import timeGridPlugin from '@fullcalendar/timegrid';

export const MainDashboard = () => {
	return (
		<>
			<DateTime />
			<FullCalendar
				plugins={[ timeGridPlugin ]}
				initialView="timeGridWeek"
				eventSources={[
					{ 
						format: 'json',
						url: '/api/getcalendar',
						extraParams: {
							calendar: 'personal',
						},
						backgroundColor: '#A67EC9', 
					},
					{ 
						format: 'json',
						url: '/api/getcalendar',
						extraParams: {
							calendar: 'family',
						},
						backgroundColor: '#6B92D6', 
					},
					{ 
						format: 'json',
						url: '/api/getcalendar',
						extraParams: {
							calendar: 'primaryWork',
						},
						backgroundColor: '#F58E9C', 
					},
					{ 
						format: 'json',
						url: '/api/getcalendar',
						extraParams: {
							calendar: 'secondaryWork',
						},
						backgroundColor: '#97C596', 
					},		
					{ 
						format: 'json',
						url: '/api/getcalendar',
						extraParams: {
							calendar: 'extracurricular',
						},
						backgroundColor: '#61516C', 
					},
				]}
				eventClick={(info) => info.jsEvent.preventDefault()}
				eventMinHeight={60}
				slotMinTime="6:00:00"
				slotMaxTime="22:00:00"
				themeSystem="standard"
				weekends={true}
			/>
		</>
	);
};