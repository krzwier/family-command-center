import { Nav, Row, Col, Tab } from 'react-bootstrap';
import { usePersons } from '../hooks/UsePersons';
import { PersonalDashboard } from './PersonalDashboard';
import React, { useState } from 'react';
import { MainDashboard } from './MainDashboard';

export const TabContainer = () => {
	const persons = usePersons();
	const colors = ['grey', 'teal', 'green', 'purple', 'blue'];
	const [color, setColor] = useState('grey');
	const [activeTab, setActiveTab] = useState(0);

	return (
		<Tab.Container defaultActiveKey="Calendar">
			<Row className="full-screen">
				<Col xs="auto" className={`pe-0 bg-${color}-dark ps-4 py-3`}>
					<Nav className="nav-pills flex-column" role="tablist">
						<Nav.Item>
							<Nav.Link
								className={`nav-${color}`}
								eventKey="Calendar"
								onClick={() => {
									setColor('grey');
									setActiveTab(0);
								}}
							>
								<img 
									src="./resources/icons/home-white.png"
									width="80px"
									style={{ padding: '10px' }} />
							</Nav.Link>
						</Nav.Item>
						{persons.filter((person) => person.PersonId !== 0).map((person) => (
							<Nav.Item key={person.PersonId}>
								<Nav.Link
									className={`nav-${color}`}
									eventKey={person.PersonName}
									onClick={() => {
										setColor(colors[person.PersonId]);
										setActiveTab(person.PersonId);
									}}
								>
									<img src={`${person.AvatarPath}`} width="80px" />
								</Nav.Link>
							</Nav.Item>
						))}
					</Nav>
				</Col>
				<Col className={`bg-${color}-light px-0`}>
					<Tab.Content className="h-100" >
						<Tab.Pane
							// key={0}
							// value={0}
							eventKey="Calendar"
							className="tab-pane"
							style={{ display: activeTab === 0 ? 'block' : 'none' }}
						>
							<MainDashboard />
						</Tab.Pane>
						{persons.filter((person) => person.PersonId !== 0).map((person) => (
							<Tab.Pane
								value={person.PersonId}
								key={person.PersonId}
								eventKey={person.PersonName}
								className="h-100"
								style={{ display: activeTab === person.PersonId ? 'block' : 'none' }}
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
