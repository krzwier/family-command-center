/* eslint-disable no-undef */

export const callFunction = async (endpoint) => {
	try {
		const response = await fetch(
			`https://family-command-center-functions.azurewebsites.net/api/${endpoint}`,
			{
				method: 'GET',
				headers: { 'x-headers-key': process.env.REACT_APP_AZURE_FUNCTIONS_KEY },
			},
		);
		return await response.json();
	} catch {
		return;
	}
};
