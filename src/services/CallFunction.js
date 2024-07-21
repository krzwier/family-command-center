/* eslint-disable no-undef */

export const callFunction = async (endpoint) => {
	try {
		const response = await fetch(
			`/api/${endpoint}`,
			{
				method: 'GET',
			},
		);
		return await response.json();
	} catch {
		return;
	}
};
