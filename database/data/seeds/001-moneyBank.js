export const allMoney = [
	{
		PersonId: 1,
		Balance: 0.0
	},
	{
		PersonId: 2,
		Balance: 0.0
	},
	{
		PersonId: 3,
		Balance: 0.0
	},
	{
		PersonId: 4,
		Balance: 0.0
	}
];

export const seed = async (knex) => {
	await knex('moneyBank').del();
	await knex('moneyBank').insert(allMoney);
};
