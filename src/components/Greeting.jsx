import { Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import React from 'react';

const getGreeting = (hour, name) => {
	if (hour >= 17) {
		return `Good evening, ${name}!`;
	}
	if (hour > 12) {
		return `Good afternoon, ${name}!`;
	}
	if (hour > 5) {
		return `Good morning, ${name}!`;
	}
	return `You should be in bed, ${name}!`;
};

export const Greeting = ({ 
	personName, 
	hour, 
}) => {
	return (
		<Row className="py-5">
			<h5 className="display-5 mx-auto text-center text-dark-gray">
				{getGreeting(hour, personName)}
			</h5>
		</Row>
	);
};

Greeting.propTypes = {
	personName: PropTypes.string, 
	hour: PropTypes.number, 
};