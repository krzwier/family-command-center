import { Nav, Row, Col, Tab } from 'react-bootstrap';
import { usePersons } from '../hooks/UsePersons';
import { PersonalDashboard } from './PersonalDashboard';
import React, { useState } from 'react';

export const TabContainer = () => {
	const persons = usePersons();
	const colors = ['pink', 'teal', 'green', 'purple', 'blue'];
	const [color, setColor] = useState('pink');

	return (
		<Tab.Container defaultActiveKey="Mommy">
			<Row className="full-screen">
				<Col xs="auto" className={`pe-0 bg-${color}-dark ps-4 py-3`}>
					<Nav className="nav-pills flex-column" role="tablist">
						{persons.map((person) => (
							<Nav.Item key={person.PersonId}>
								<Nav.Link
									className={`nav-${color}`}
									eventKey={person.PersonName}
									onClick={() => setColor(colors[person.PersonId])}
								>
									<img src={`${person.AvatarPath}`} width="80px" />
								</Nav.Link>
							</Nav.Item>
						))}
					</Nav>
				</Col>
				<Col className={`bg-${color}-light px-0`}>
					<Tab.Content className="h-100">
						{persons.map((person) => (
							<Tab.Pane
								key={person.PersonId}
								eventKey={person.PersonName}
								className="h-100"
							>
								<PersonalDashboard
									key={person.PersonId}
									personId={person.PersonId}
									color={color}
								/>
							</Tab.Pane>
						))}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};
