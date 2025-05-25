import Category from "../../models/Category.js";

export const index = async (req, res) => {
  try {
    const categories = await Category.query().withGraphFetched("tasks");
    if (!categories) {
      return res.status(404).json({ message: "No categories found." });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.query()
      .findById(id)
      .withGraphFetched("tasks");

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const store = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExists = await Category.query().findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newCategory = await Category.query().insert(req.body);
    res.json({
      message: `Following category has been created: ${newCategory.name}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    if (name) {
      const categoryExists = await Category.query()
        .where("name", name)
        .whereNot("id", id)
        .first();
      if (categoryExists) {
        return res.status(400).json({ message: "Category already exists!" });
      }
    }

    const updatedCategory = await Category.query().patchAndFetchById(id, {
      name,
    });

    res.json({
      message: "Category has been updated",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryExists = await Category.query().findById(id);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found." });
    }

    const deletedCategory = await Category.query().deleteById(id);
    res.json({ message: "Category successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
