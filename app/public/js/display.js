const $tasksList = document.getElementById("tasks");
const $completedTasksList = document.getElementById("tasks-completed");
const $categoriesList = document.getElementById("categories");

import { fetchData } from "./main.js";
import { filterTasks, topFunction } from "./utils.js";

function displayCategory(task) {
  if (!task.categories) {
    return "";
  }
  return `<span class="task__category">${task.categories.name}</span>`;
}

function displayCategories(categories) {
  $categoriesList.innerHTML = `
          <li>
              <div data-containerType="update-container"></div>
          </li>

          <li>
            <div data-id="0" id="default-btn" class="categories__item wrapper wrapper--primary">
                <button>
                    Default 
                    
                </button>

            </div>
        </li>`;
  if (categories.length === 0) {
    $categoriesList.innerHTML = ` 
      <li class="categories__item wrapper wrapper--primary">No categories found.</li>`;
    return;
  }

  $categoriesList.insertAdjacentHTML(
    "beforeend",
    categories
      .map((category) => {
        return `
          <li>
            <div data-id=${
              category.id
            } class="categories__item wrapper wrapper--primary">
              <button>
                  ${category.name}
                  ${
                    category.tasks.length > 0
                      ? `<span class="category-length"> ${category.tasks.length}</span>`
                      : ""
                  }
              </button>
              <button data-id=${category.id} data-btnType="update-cat-open">
              <i class="fa-solid fa-pen"></i>
              </button>
            </div>
      </li>
      `;
      })
      .join("")
  );
}

function displayToDoTasks(tasks) {
  const $tasksLength = document.querySelector(`[data-status="incomplete"]`);
  if (tasks.length === 0) {
    $tasksLength.style.display = "none";
    return ($tasksList.innerHTML = `<li class="tasks__item wrapper">No tasks for this category.</li>`);
  }
  $tasksLength.style.display = "inline-block";
  $tasksLength.innerHTML = `${tasks.length}`;

  $tasksList.innerHTML = tasks
    .map((task) => {
      return `
       <li class="tasks__item wrapper">
           <p>${task.name} ${displayCategory(task)}</p>
           <div class="btn-container">
               <button data-taskId=${
                 task.id
               } class="complete-btn">
                   <i class="fa-solid fa-check"></i>
               </button>
               <button data-taskId=${
                 task.id
               } class="update-open-btn">
                   <i class="fa-solid fa-pen-to-square"></i>
               </button>
               <button data-taskId=${task.id} class="delete-btn">
                   <i class="fa-solid fa-trash"></i>
               </button>
           </div>
       </li>
        `;
    })
    .join("");
}

function displayCompletedTasks(tasks) {
  const $tasksLength = document.querySelector(`[data-status="complete"]`);

  if (tasks.length === 0) {
    $tasksLength.style.display = "none";
    return ($completedTasksList.innerHTML = `<li class="tasks__item wrapper">You have no completed tasks.</li>`);
  }
  $tasksLength.style.display = "inline-block";
  $tasksLength.innerHTML = `${tasks.length}`;
  $completedTasksList.innerHTML = tasks
    .map((task) => {
      return `
        <li class="tasks__item wrapper">
          <p>${task.name} ${displayCategory(task)}</p>
          <button data-taskId=${task.id} class="incomplete-btn">
              <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button data-taskId=${task.id} class="delete-btn">
              <i class="fa-solid fa-trash"></i>
          </button>
        </li>`;
    })
    .join("");
}

function renderTasks(tasks) {
  displayToDoTasks(filterTasks(tasks, 0));
  displayCompletedTasks(filterTasks(tasks, 1));
}

function displayValidation(message, status) {
  topFunction();
  const $tasks = document.querySelector(".tasks");
  const $validation = $tasks.querySelector(".validation");
  if ($validation) {
    $validation.remove();
  }
  $tasks.insertAdjacentHTML(
    "afterbegin",
    `<div class="validation" style="background-color:${
      status === 200 ? "#3dd9b3" : "#ff7474"
    }"><p>${message}</p></div>`
  );
}

async function displayUpdateField(tasks, taskId, $container) {
  $container.insertAdjacentHTML(
    "beforeend",
    ` 
      <form class="tasks__form" id="update-form" method="post">
          <div class="form__item wrapper">
              <input class="tasks__input" type="text">
              <select class="tasks__select" name="categories" id="update-form-category-select">
                  <option value="">Select a category</option>
              </select>
              <button type="submit" class="update-btn">
                  <i class="fa-solid fa-pen-to-square"></i>
              </button>
          </div>
      </form>
    `
  );
  await insertTaskData(tasks, taskId);
}

async function insertTaskData(tasks, id) {
  const $inputField = document.querySelector(".tasks__input");
  const $selectField = document.querySelector(".tasks__select");
  const currentTask = tasks.find((task) => task.id === id);

  try {
    const categories = await fetchData("categories");

    displayCategoryOption(categories, $selectField);
    $inputField.value = currentTask.name;
    $selectField.value = JSON.stringify(currentTask.category_id);
  } catch (error) {
    console.error(error);
  }
}

async function insertCategoryData(id) {
  try {
    const { name } = await fetchData(`categories/${id}`);
    const $inputField = document.querySelector(".update-input");
    $inputField.value = name;
  } catch (error) {
    console.error(error);
  }
}

function displayCategoryOption(categories, $categorySelect) {
  $categorySelect.innerHTML = `
  <option value="">Select a category</option>
  `;
  $categorySelect.insertAdjacentHTML(
    "beforeend",
    categories
      .map((category) => {
        return `
        <option value=${category.id}>${category.name}</option>
        `;
      })
      .join("")
  );
}

function displayCategoryField($container, operation, id = "") {
  $container.innerHTML = `
  <form id="${operation}-category" class="categories__item wrapper wrapper--primary active">
    <input class="${operation}-input"  type="text" required style="width:100%">
    <button class="${operation}-submit" type="submit">    
      <i class="fa-solid fa-plus"></i>
    </button>
    <button class="${operation}-close" type="button">    
      <i class="fa-solid fa-xmark"></i>    
    </button>
  </form>
  `;
  if (id) {
    insertCategoryData(id);
  }
}

export {
  displayCategories,
  renderTasks,
  displayValidation,
  displayUpdateField,
  displayCategoryOption,
  displayCategoryField,
  $tasksList
};
