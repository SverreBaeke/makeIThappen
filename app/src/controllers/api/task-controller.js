import Task from "../../models/Task.js";

export const index = async (req, res) => {
  try {
    const tasks = await Task.query().withGraphFetched("categories");
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found." });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.query().findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const store = async (req, res) => {
  try {
    const {name} = req.body
    const taskExists = await Task.query().findOne({ name });
    if (taskExists) {
      return res.status(400).json({ message: "Task already exists!" });
    }

    const newTask = await Task.query().insert(req.body);

    res.json({ message: `Task created: ${newTask.name}`, });
  } catch (error) {
    res.status(500).json({ message: "Task and category are required!", error });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, category_id, completed } = req.body;
  try {
    if (!name && !category_id && !req.body.hasOwnProperty("completed")) {
      return res
        .status(400)
        .json({ message: "Task name, category or completion status is required!" });
    }

    const task = await Task.query().findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    if(name){
    const taskExists = await Task.query().where('name', name) .whereNot('id', id).first();
    if (taskExists) {
      return res.status(400).json({ message: "Task already exists!" });
    }
  }

    const updatedTask = await Task.query().patchAndFetchById(id, {
      name,
      category_id,
      completed,
    });

    return res.status(200).json({ message: "Task has been updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const taskExists = await Task.query().findById(id);
    if (!taskExists) {
      return res.status(404).json({ message: "Task not found." });
    }

    const deletedTask = await Task.query().deleteById(id);
    res.status(200).json({ message: "Task successfully deleted!"})
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
