export const allRewards = [
	{
		RewardId: 64,
		Money: 1,
		Description: 'Funny Money',
		Quantity: 7,
		Points: 32,
		IconPath: './resources/Icons/funny.png'
	},
	{
		RewardId: 29,
		Money: 0,
		Description: 'Cool Thing',
		Quantity: 1,
		Points: 92,
		IconPath: './resources/Icons/cool.png'
	}
];

export const seed = async (knex) => {
	await knex('reward').del();
	await knex('reward').insert(allRewards);
};
