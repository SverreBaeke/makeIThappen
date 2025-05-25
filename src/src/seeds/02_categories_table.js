const tableName = "categories";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { name: "Health" },
    { name: "Home" },
    { name: "Personal" },
    { name: "Leisure" },
    { name: "Work" },
  ]);
};

export { seed };
