//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createCheckbox = function () {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  return checkbox;
};

const createLabel = function (taskString) {
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task";
  return label;
};

const createEditTaskInput = function () {
  const editTaskInput = document.createElement("input");
  editTaskInput.type = "text";
  editTaskInput.className = "task";
  return editTaskInput;
};

const createEditButton = function () {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const taskItem = document.createElement("li");

  taskItem.appendChild(createCheckbox());
  taskItem.appendChild(createLabel(taskString));
  taskItem.appendChild(createEditTaskInput());
  taskItem.appendChild(createEditButton());
  taskItem.appendChild(createDeleteButton());
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editTaskInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editBtn = taskItem.querySelector(".edit");
  const containsClass = taskItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editTaskInput.value;
    editBtn.innerText = "Edit";
  } else {
    editTaskInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  ul.removeChild(taskItem);
};

const taskCompleted = function () {
  const taskItem = this.parentNode;
  completedList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  const taskItem = this.parentNode;
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem, checkboxEventHandler) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkbox.onchange = checkboxEventHandler;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], taskCompleted);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
