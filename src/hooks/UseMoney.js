import { useState, useEffect } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const useMoney = (personId) => {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		callFunction(`getmoneybalance/personid=${personId}`)
			.then((data) => {
				setBalance(data[0]?.Balance ?? 0);
			});
	}, [personId, setBalance]);

	return balance;
};
