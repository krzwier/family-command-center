export const up = (knex) => {
	return knex.schema.createTable('pointBank', (tbl) => {
		tbl.integer('PersonId').notNullable();
		tbl.decimal('Balance').notNullable();
	});
};

export const down = (knex) => {
	return knex.schema.dropTableIfExists('pointBank');
};
