import knex from "../lib/Knex.js";
import { Model } from "objection";
import Category from "./Category.js";

Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "category_id"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        completed: { type: "integer"},
        category_id: { type: "integer"}
      },
    };
  };

  static get relationMappings() {
    return {
      categories: {
        relation: Model.BelongsToOneRelation ,
        modelClass: Category,
        join: {
          from: "tasks.category_id",
          to: "categories.id",
        }
      }
    }
  }
}

export default Task;
