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

//New task list item
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
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  //Append taskItem to todoList
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editTaskInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editBtn = taskItem.querySelector(".edit");
  const containsClass = taskItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editTaskInput.value;
    editBtn.innerText = "Edit";
  } else {
    editTaskInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskItem);
};

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const taskItem = this.parentNode;
  completedList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskItem = this.parentNode;
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (tasktaskItem, checkboxEventHandler) {
  //select taskItems children
  const checkbox = tasktaskItem.querySelector("input[type=checkbox]");
  const editButton = tasktaskItem.querySelector("button.edit");
  const deleteButton = tasktaskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkboxEventHandler.
  checkbox.onchange = checkboxEventHandler;
};

//cycle over todoList ul list items
//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoList.children[i], taskCompleted);
}

//cycle over completedList ul list items
for (let i = 0; i < completedList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedList.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
