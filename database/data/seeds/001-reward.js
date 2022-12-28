export const allRewards = [
	{
		RewardId: 0,
		Money: true,
		Description: 'Arcade Money',
		Quantity: 5,
		Points: 50,
		IconPath: './resources/Icons/arcade.png',
	},
	{
		RewardId: 1,
		Money: true,
		Description: 'Beaverdale Confections Money',
		Quantity: 5,
		Points: 50,
		IconPath: './resources/Icons/candy.png',
	},
	{
		RewardId: 2,
		Money: false,
		Description: 'Choose Dinner',
		Quantity: 1,
		Points: 50,
		IconPath: './resources/Icons/dinner.png',
	},
	{
		RewardId: 3,
		Money: false,
		Description: 'Date with Mommy',
		Quantity: 1,
		Points: 100,
		IconPath: './resources/Icons/mommy-date.png',
	},
];

export const seed = async (knex) => {
	await knex('reward').del();
	await knex('reward').insert(allRewards);
};
