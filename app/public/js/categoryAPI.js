import {
  displayCategories,
  displayCategoryOption,
  renderTasks,
  displayValidation,
} from "./display.js";
import {
  addListenerToCategoryButtons,
  initTaskButtons,
  addListenerToOpenCategoryOperationButtons,
} from "./listeners.js";
import { API_URL, fetchData } from "./main.js";
import { updateTask } from "./taskAPI.js";
import { highlightCategory } from "./utils.js";

const $postCategorySelect = document.getElementById("post-category-select");

async function getCategoriesData() {
  try {
    const categories = await fetchData("categories");
    displayCategories(categories);
    displayCategoryOption(categories, $postCategorySelect);

    const $categoryButtons = Array.from(
      document.querySelectorAll(".categories__item")
    );

    highlightCategory($categoryButtons);

    const $openUpdateBtn = document.querySelectorAll(
      `[data-btnType="update-cat-open"]`
    );
    const $openCreateBtn = document.querySelectorAll(
      `[data-btnType="create-cat-open"]`
    );
    const $updateContainer = document.querySelector(
      `[data-containerType="update-container"]`
    );
    const $createContainer = document.querySelector(
      `[data-containerType="create-container"]`
    );
    addListenerToCategoryButtons($categoryButtons);
    addListenerToOpenCategoryOperationButtons(
      $openUpdateBtn,
      "update",
      updateCategory,
      $updateContainer
    );
    addListenerToOpenCategoryOperationButtons(
      $openCreateBtn,
      "create",
      createCategory,
      $createContainer
    );
  } catch (error) {
    console.error(error);
  }
}

async function getCategoryData(id) {
  try {
    const selectedCategory = await fetchData(`categories/${id}`);
    const categoryTasks = selectedCategory?.tasks;
    renderTasks(categoryTasks);
    initTaskButtons(categoryTasks, updateTask);
  } catch (error) {
    console.error(error);
  }
}

async function createCategory(content, $container) {
  try {
    const response = await fetch(`${API_URL}categories`, {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status } = response;
    const { message } = await response.json();
    $container.innerHTML = "";
    displayValidation(message, status);
    await getCategoriesData();
  } catch (error) {
    console.error(error).log(message);
  }
}

async function updateCategory(content, $container, id) {
  try {
    const response = await fetch(`${API_URL}categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status } = response;
    const { message } = await response.json();
    $container.innerHTML = "";
    displayValidation(message, status);
    await getCategoriesData();
  } catch (error) {
    console.error(error).log(message);
  }
}

export { getCategoriesData, getCategoryData, createCategory };
