import { useState, useEffect } from 'react';

export const useMoney = (personId) => {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		fetch(`http://localhost:4001/moneyBalance/personId=${personId}`)
			.then((response) => response.json())
			.then(setBalance);
	}, [personId]);

	return balance;
};
