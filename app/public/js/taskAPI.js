import { API_URL, fetchData, initPage } from "./main.js";
import { displayValidation, renderTasks } from "./display.js";
import { initTaskButtons } from "./listeners.js";
import { getCategoriesData, getCategoryData } from "./categoryAPI.js";


async function getTasksData() {
  try {
    const tasks = await fetchData("tasks");
    renderTasks(tasks);
    initTaskButtons(tasks, updateTask);
  } catch (error) {
    console.error(error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}tasks/${id}`, {
      method: "DELETE",
    });
    const { status } = response;
    const { message } = await response.json();
    displayValidation(message, status);
    if (localStorage.getItem("currentCategory") === "0") {
      await initPage();
    } else {
      await getCategoryData(localStorage.getItem("currentCategory"));
    }
    await getCategoriesData();
  } catch (error) {
    console.error(error);
  }
}

async function updateTaskStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const { status: resStatus } = response;
    const { message } = await response.json();
    displayValidation(message, resStatus);
    if (localStorage.getItem("currentCategory") === "0") {
      return await getTasksData();
    }
    await getCategoryData(localStorage.getItem("currentCategory"));
  } catch (error) {
    console.error(error);
  }
}

async function updateTask(content, id) {
  try {
    const response = await fetch(`${API_URL}tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status } = response;
    const { message } = await response.json();
    displayValidation(message, status);
    getCategoriesData();
    if (localStorage.getItem("currentCategory") === "0") {
      return await getTasksData();
    }
    getCategoryData(localStorage.getItem("currentCategory"));
  } catch (error) {
    console.error(error);
  }
}

async function createTask(content) {
  try {
    const response = await fetch(`${API_URL}tasks`, {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status } = response;
    const { message } = await response.json();
    displayValidation(message, status);
    if (localStorage.getItem("currentCategory") === "0") {
      await initPage();
    } else {
      getCategoriesData();
      getCategoryData(localStorage.getItem("currentCategory"));
    }
  } catch (error) {
    console.error(error);
  }
}

export { getTasksData, deleteTask, updateTaskStatus, updateTask, createTask };
