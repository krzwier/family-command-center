export const up = (knex) => {
	return knex.schema.createTable('chore', (tbl) => {
		tbl.integer('ChoreId').notNullable();
		tbl.string('Description').notNullable();
		tbl.decimal('Pay').notNullable();
		tbl.string('IconPath').notNullable();
	});
};

export const down = (knex) => {
	return knex.schema.dropTableIfExists('chore');
};
