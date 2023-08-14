import { Row, Container, Col } from 'react-bootstrap';
import React from 'react';
import CalendarIcon from 'react-calendar-icon';
import { ThemeProvider } from '@emotion/react';
import AnalogClock from 'analog-clock-react';
import { ClockNumbers } from './ClockNumbers';

export const DateTime = () => {
	const theme = {
		calendarIcon: {
			textColor: 'white',
			primaryColor: '#343436',
			backgroundColor: '#fafafa',
		},
	};

	return (
		<Container className="pb-4">
			<Row className="d-flex justify-content-end">
				<Col className="col-2 d-flex justify-content-end p-0 mx-2" >
					<AnalogClock width="132px" />
					<ClockNumbers />
				</Col>
				<Col className="col-2 d-flex p-0 justify-content-end" >
					<ThemeProvider theme={theme}>
						<CalendarIcon 
							className="calendar-icon"
							date={new Date()} 
						/>
					</ThemeProvider>
				</Col>
			</Row>
		</Container>
	);
};