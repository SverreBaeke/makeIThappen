const tableName = "tasks";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      name: "Buy groceries",
      completed: 0 ,
      category_id: 3
    },
    {
      name: "Finish project report",
      completed: 1,
      category_id: 5
    },
    {
      name: "Exercise for 30 minutes",
      completed: 0,
      category_id: 1
    },
    {
      name: "Call mom",
      completed: 1,
      category_id: 3
    },
    {
      name: "Prepare presentation slides",
      completed: 0,
      category_id: 5
    },
    {
      name: "Read a book",
      completed: 0,
      category_id: 4
    },
    {
      name: "Buy grgfdoceries",
      completed: 0 ,
      category_id: 3
    },
    {
      name: "Finish progfdject report",
      completed: 1,
      category_id: 5
    },
    {
      name: "Exercise fodfr 30 minutes",
      completed: 0,
      category_id: 1
    },
    {
      name: "Call modgfm",
      completed: 1,
      category_id: 3
    },
    {
      name: "Prepare presentatigdon slides",
      completed: 0,
      category_id: 5
    },
    {
      name: "Read a bgdook",
      completed: 0,
      category_id: 4
    },
    {
      name: "Buy grocergdfgdies",
      completed: 0 ,
      category_id: 3
    },
    {
      name: "Finish progdject report",
      completed: 1,
      category_id: 5
    },
    {
      name: "Exercisgde for 30 minutes",
      completed: 0,
      category_id: 1
    },
    {
      name: "Call mogddm",
      completed: 1,
      category_id: 3
    },
    {
      name: "Prepagdre presentation slides",
      completed: 0,
      category_id: 5
    },
    {
      name: "Read a bogdok",
      completed: 0,
      category_id: 4
    }

  ]);
};

export { seed };
