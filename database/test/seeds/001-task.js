export const allTasks = [
	{
		TaskId: 0,
		TaskDescription: 'Brush Teeth',
		IconPath: './resources/Icons/toothbrush.png'
	},
	{
		TaskId: 1,
		TaskDescription: 'Get Dressed',
		IconPath: './resources/Icons/clothes.png'
	},
	{
		TaskId: 2,
		TaskDescription: 'Eat Breakfast',
		IconPath: './resources/Icons/breakfast.png'
	},
	{
		TaskId: 3,
		TaskDescription: 'Take Medicine',
		IconPath: './resources/Icons/medicine.png'
	},
	{
		TaskId: 4,
		TaskDescription: 'Fill & Pack Water Bottle',
		IconPath: './resources/Icons/bottle.png'
	},
	{
		TaskId: 5,
		TaskDescription: 'Pack Backpack',
		IconPath: './resources/Icons/backpack.png'
	},
	{
		TaskId: 6,
		TaskDescription: 'Put on Shoes',
		IconPath: './resources/Icons/shoes.png'
	},
	{
		TaskId: 7,
		TaskDescription: 'Put Away Breakfast',
		IconPath: './resources/Icons/dishes-away.png'
	},
	{
		TaskId: 8,
		TaskDescription: 'Pack Snack',
		IconPath: './resources/Icons/snack.png'
	},
	{
		TaskId: 9,
		TaskDescription: 'Put Away Backpack',
		IconPath: './resources/Icons/backpack.png'
	},
	{
		TaskId: 10,
		TaskDescription: 'Put Water Bottle In Kitchen',
		IconPath: './resources/Icons/bottle.png'
	},
	{
		TaskId: 11,
		TaskDescription: 'Put on Shoes',
		IconPath: './resources/Icons/shoes.png'
	},
	{
		TaskId: 12,
		TaskDescription: 'Put Away Winter Gear',
		IconPath: './resources/Icons/winter-coat.png'
	},
	{
		TaskId: 13,
		TaskDescription: 'Pack Winter Bag',
		IconPath: './resources/Icons/winter-bag.png'
	},
	{
		TaskId: 14,
		TaskDescription: 'Put on Glasses',
		IconPath: './resources/Icons/glasses.png'
	},
	{
		TaskId: 15,
		TaskDescription: 'Do Homework',
		IconPath: './resources/Icons/homework.png'
	},
	{
		TaskId: 16,
		TaskDescription: `Put Papers on Mommy's Desk`,
		IconPath: './resources/Icons/papers.png'
	},
	{
		TaskId: 17,
		TaskDescription: 'Let Paisley Out',
		IconPath: './resources/Icons/dog-poop.png'
	},
	{
		TaskId: 18,
		TaskDescription: 'Put on Jammies',
		IconPath: './resources/Icons/pajamas.png'
	}
];

export const seed = async (knex) => {
	await knex('task').del();
	await knex('task').insert(allTasks);
};
