import bcrypt from "bcrypt";

const tableName = "users";

const seed = async function (knex) {
  await knex(tableName).truncate();

  const password = "secret123";
  const hashedPassword = await bcrypt.hash(password, 10);
  await knex(tableName).insert([
    {
      firstname: "Bruce",
      lastname: "Wayne",
      email: "Brucy.Wayne@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Dick",
      lastname: "Grayson",
      email: "Dicky.Grayson@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Jack",
      lastname: "Napier",
      email: "Jacky.Napier@example.com",
      password: hashedPassword,
    },
  ]);
};

export { seed };
