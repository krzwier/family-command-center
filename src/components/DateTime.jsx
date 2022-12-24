import { Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import React from 'react';

export const DateTime = ({ date }) => {
	return (
		<Row>
			<p className="text-end text-dark-gray py-2 px-3">
				<small>
					{`${date.toLocaleString('en-us', {
						weekday: 'long',
					})}, ${date.toLocaleString('en-us', {
						dateStyle: 'long',
					})}, ${date.toLocaleString('en-us', {
						timeStyle: 'short',
					})}`}
				</small>
			</p>
		</Row>
	);
};

DateTime.propTypes = {
	date: PropTypes.object,
};