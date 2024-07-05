/* eslint-disable no-undef */

export const callFunction = async (endpoint) => {
	console.log(`calling ${endpoint}`);
	const response = await fetch(
		`https://family-command-center-functions.azurewebsites.net/api/${endpoint}`,
		{
			method: 'GET',
			headers: { 'x-headers-key': process.env.REACT_APP_AZURE_FUNCTIONS_KEY },
		},
	);
	const final = await response.json();
	return final;
};
