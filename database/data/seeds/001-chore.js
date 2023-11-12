export const allChores = [
	{
		ChoreId: 0,
		Description: 'Mow Lawn',
		Pay: 10,
		IconPath: './resources/Icons/mower.png',
	},
	{
		RewardId: 1,
		Description: 'Mulch Leaves With Mower',
		Pay: 20,
		IconPath: './resources/Icons/mowLeaves.png',
	},
	{
		RewardId: 2,
		Description: 'Rake Leaves (1 bag)',
		Pay: 1,
		IconPath: './resources/Icons/rake.png',
	},
	{
		RewardId: 3,
		Description: 'Cycle Dishwasher',
		Pay: 1,
		IconPath: './resources/Icons/dishwasher.png',
	},
	{
		RewardId: 4,
		Description: 'Wash Dishes By Hand',
		Pay: 2,
		IconPath: './resources/Icons/washDishes.png',
	},
	{
		RewardId: 5,
		Description: 'Clean Countertops and Stove',
		Pay: 1,
		IconPath: './resources/Icons/washDishes.png',
	},
	{
		RewardId: 6,
		Description: 'Clear and Wipe Table',
		Pay: 1,
		IconPath: './resources/Icons/table.png',
	},
	{
		RewardId: 7,
		Description: 'Clean Toilet',
		Pay: 1,
		IconPath: './resources/Icons/cleanToilet.png',
	},
	{
		RewardId: 8,
		Description: 'Clean Sink in Downstairs Bathroom',
		Pay: 1,
		IconPath: './resources/Icons/cleanSink.png',
	},
	{
		RewardId: 9,
		Description: 'Clean Sinks in Upstairs Bathroom',
		Pay: 2,
		IconPath: './resources/Icons/cleanSink.png',
	},
	{
		RewardId: 10,
		Description: 'Clean Shower',
		Pay: 5,
		IconPath: './resources/Icons/cleanShower.png',
	},
	{
		RewardId: 11,
		Description: 'Clean Mirror',
		Pay: 0.50,
		IconPath: './resources/Icons/Mirror.png',
	},
	{
		RewardId: 12,
		Description: 'Clean Glass Doors',
		Pay: 1,
		IconPath: './resources/Icons/Mirror.png',
	},
	{
		RewardId: 13,
		Description: 'Clean Window',
		Pay: 1,
		IconPath: './resources/Icons/Window.png',
	},
	{
		RewardId: 14,
		Description: 'Put away art supplies',
		Pay: 1,
		IconPath: './resources/Icons/art.png',
	},
	{
		RewardId: 15,
		Description: 'Tidy Up Living Room',
		Pay: 1,
		IconPath: './resources/Icons/livingRoom.png',
	},
	{
		RewardId: 16,
		Description: 'Dust Living Room Surfaces',
		Pay: 1,
		IconPath: './resources/Icons/Dust.png',
	},
];

export const seed = async (knex) => {
	await knex('chore').del();
	await knex('chore').insert(allChores);
};
