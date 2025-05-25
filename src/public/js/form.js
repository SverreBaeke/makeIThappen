export function initTaskForm(
  $form,
  callback,
  $inputField,
  $selectField,
  id = ""
) {
  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await callback(
        {
          name: $inputField.value,
          category_id: parseInt($selectField.value),
        },
        id
      );

      $inputField.value = "";
      $selectField.value = "";
    } catch (error) {
      console.error(error);
    }
  });
}

export function initCategoryForm(
  $form,
  operation,
  callback,
  $container,
  id = ""
) {
  const $inputField = document.querySelector(`.${operation}-input`);
  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await callback(
        {
          name: $inputField.value,
        },
        $container,
        id
      );
    } catch (error) {
      console.error(error);
    }
  });
}
