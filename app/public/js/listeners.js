import { displayUpdateField, displayCategoryField, displayValidation } from "./display.js";
import { deleteTask, updateTaskStatus, getTasksData } from "./taskAPI.js";
import { initCategoryForm, initTaskForm } from "./form.js";
import { topFunction, highlightCategory } from "./utils.js";
import { getCategoryData } from "./categoryAPI.js";

function addListenerToDeleteButtons() {
  const $deleteBtns = document.querySelectorAll(".delete-btn");
  try {
    $deleteBtns.forEach(($deleteBtn) => {
      $deleteBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this task?") === true) {
          await deleteTask($deleteBtn.getAttribute("data-taskId"));
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function addListenerToCompleteStatusButtons($buttons, status) {
  $buttons.forEach(($button) => {
    $button.addEventListener("click", async () => {
      try {
        await updateTaskStatus($button.getAttribute("data-taskId"), status);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

function addListenerToUpdateOpenbuttons(tasks, updateTask) {
  const $updateOpenButtons = document.querySelectorAll(".update-open-btn");

  $updateOpenButtons.forEach(($updateOpenButton) => {
    $updateOpenButton.addEventListener("click", (e) => {
      const $container = e.target.closest(".tasks__item");
      const taskId = parseInt($updateOpenButton.getAttribute("data-taskId"));
      if(!document.getElementById("update-form")){
      displayUpdateField(tasks, taskId, $container);

      const $inputField = $container.querySelector(".tasks__input");
      const $selectField = $container.querySelector(".tasks__select");
      const $updateForm = document.getElementById("update-form");
      initTaskForm($updateForm, updateTask, $inputField, $selectField, taskId);
    } else {
      displayValidation("Finish updating your current task before editing another one",400);
    } });
});

}

function initTaskButtons(tasks, updateTask) {
  const $completeButtons = document.querySelectorAll(".complete-btn");
  const $inCompleteButtons = document.querySelectorAll(".incomplete-btn");
  addListenerToDeleteButtons();
  addListenerToCompleteStatusButtons($completeButtons, 1);
  addListenerToCompleteStatusButtons($inCompleteButtons, 0);
  addListenerToUpdateOpenbuttons(tasks, updateTask);
}

function addListenerToCategoryButtons($buttons) {
  $buttons.forEach(($button) => {
    $button.addEventListener("click", async () => {
      const id = $button.getAttribute("data-id");
      try {
        if (id === "0") {
          await getTasksData();
        } else {
          await getCategoryData(id);
        }
        localStorage.setItem("currentCategory", id);
        topFunction();
        highlightCategory($buttons);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

function addListenerToOpenCategoryOperationButtons(
  $buttons,
  operation,
  callback,
  $container
) {
  $buttons.forEach(($button) =>
    $button.addEventListener("click", async (e) => {
      const id = e.currentTarget.getAttribute("data-id");

      if (id) {
        displayCategoryField($container, operation, id);
      } else {
        displayCategoryField($container, operation);
      }

      const $form = document.getElementById(`${operation}-category`);
      addListenerToCategoryCloseButton(operation, $container);
      initCategoryForm($form, operation, callback, $container, id);
    })
  );
}

function addListenerToCategoryCloseButton(operation, $container) {
  const $closeBtn = document.querySelector(`.${operation}-close`);
  $closeBtn.addEventListener("click", () => {
    $container.innerHTML = "";
  });
};

export {
  initTaskButtons,
  addListenerToCategoryButtons,
  addListenerToOpenCategoryOperationButtons,
};
