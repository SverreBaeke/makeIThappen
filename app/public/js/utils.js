function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function removeActiveClass($buttons) {
  $buttons.forEach(($button) => {
    $button.classList.remove("active");
  });
}

function addActiveClass($button) {
  $button.classList.add("active");
}

function highlightCategory($buttons) {
  const $button = $buttons.find(
    (element) =>
      element.getAttribute("data-id") ===
      localStorage.getItem("currentCategory")
  );
  removeActiveClass($buttons);
  addActiveClass($button);
}

function filterTasks(tasks, boolean) {
  const filteredTasks = tasks.filter((task) => task.completed === boolean);
  return filteredTasks;
}

export {
  topFunction,
  filterTasks,
  highlightCategory
};
