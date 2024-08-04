import { usePersons } from '../hooks/UsePersons';
import { PersonalDashboard } from './PersonalDashboard';
import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { DateTime } from './DateTime';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HomeIcon from '@mui/icons-material/Home';

export const TabContainer = () => {
	const persons = usePersons();
	const [activeTab, setActiveTab] = useState('home');

	const handleTabChange = (_, newTab) => {
		setActiveTab(newTab);
	};

	return (
		<>
			<TabContext value={activeTab}>
				<TabList centered onChange={handleTabChange}>
					<Tab
						label="Home"
						key={0}
						value={'home'}
						icon={
							<HomeIcon /> //color={activeTab === "home" ? Colors.main : "white"} />
						}
					/>
					{persons
						.filter((person) => person.PersonId !== 0)
						.map((person) => (
							<Tab
								label={person.PersonName}
								key={person.PersonId}
								value={person.PersonName}
								icon={
									<Box marginX={1}>
										<img src={`${person.AvatarPath}`} height="64px" />
									</Box>
								}
							/>
						))}
				</TabList>
				<TabPanel key={0} value={'home'}>
					<DateTime />
					<Calendar />
				</TabPanel>
				{persons
					.filter((person) => person.PersonId !== 0)
					.map((person) => (
						<TabPanel key={person.PersonId} value={person.PersonName}>
							<PersonalDashboard
								key={person.PersonId}
								personId={person.PersonId}
							/>
						</TabPanel>
					))}
			</TabContext>
		</>
	);
};
