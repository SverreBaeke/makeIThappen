export const API_URL = "http://localhost:3000/";
const $createForm = document.getElementById("create-form");
const $inputField = document.querySelector("input");
const $selectField = document.querySelector("select");
localStorage.setItem("currentCategory", "0");

import { initTaskForm } from "./form.js";
import { createTask, getTasksData } from "./taskAPI.js";
import { getCategoriesData } from "./categoryAPI.js";
import { $tasksList } from "./display.js";

export async function fetchData(path) {
  try {
    const response = await fetch(`${API_URL}${path}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function initPage() {
  try {
    getTasksData(tasks);
    getCategoriesData(categories);
  } catch (error) {
    console.error(error);
  }
}

if($tasksList) {
initPage();
initTaskForm($createForm, createTask, $inputField, $selectField);
}
