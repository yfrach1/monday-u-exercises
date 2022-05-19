let tasks_list = [];
let tasks_amount = 0;
const add_button = document.getElementById("add_button");
add_button.addEventListener("click", onClickAddTask);

const input = document.getElementById("task_input");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onClickAddTask();
  }
});

const sort_butten = document.getElementById("sort_button");
sort_butten.addEventListener("click", sortTasksList);

const clearAll_button = document.getElementById("clearAll_button");
clearAll_button.addEventListener("click", onClickClearAll);

function onClickAddTask() {
  let input_tag = document.getElementById("task_input");
  let text = input_tag.value;
  if (!text) {
    alert("An empty task is for lazy pepole ;)");
    return;
  } else if (firstCharIsNotCapital(text)) {
    text = capitalizeFirstLetter(text);
  }

  input_tag.value = "";
  if (tasks_amount === 0) {
    setSortButtonDisplay("block");
    setEmptyTasksDivDisplay("none");
    setBottomDivBarDisplay("flex");
    setTasksDivContainerDisplay("flex");
  }
  injectNewTaskToHtml(text);
}

function firstCharIsNotCapital(text) {
  return text[0].toUpperCase() !== text[0];
}

function capitalizeFirstLetter(text) {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
}

function onClickClearAll() {
  clearTasksHtml();
  resetTaskList();
}

function clearTasksHtml() {
  const tasks_list_div = document.getElementById("tasks_list_container");
  tasks_list_div.innerHTML = "";
}
function resetTaskList() {
  tasks_list = [];
  tasks_amount = 0;
  setSortButtonDisplay("none");
  setEmptyTasksDivDisplay("block");
  setBottomDivBarDisplay("none");
  setTasksDivContainerDisplay("none");
}

function setBottomDivBarDisplay(displayStatus) {
  const buttom_div_bar = document.getElementById("buttom_bar_container");
  buttom_div_bar.style.display = displayStatus;
}
function setTasksDivContainerDisplay(displayStatus) {
  const tasks_list_div = document.getElementById("tasks_list_container");
  tasks_list_div.style.display = displayStatus;
}
function setEmptyTasksDivDisplay(displayStatus) {
  const tasks_list_div = document.getElementById("empty_tasks_text");
  tasks_list_div.style.display = displayStatus;
}
function setSortButtonDisplay(displayStatus) {
  const sort_button = document.getElementById("sort_button");
  sort_button.style.display = displayStatus;
}

function updatePendingTask() {
  const pending_tasks_p_tag = document.getElementById(
    "amount_of_pending_tasks"
  );
  pending_tasks_p_tag.innerText = "You have " + tasks_amount + " pending tasks";
}

function sortTasksList() {
  clearTasksHtml();
  console.log(tasks_list);
  tasks_list.sort((a, b) => {
    return a.text.toLowerCase().localeCompare(b.text.toLowerCase());
  });
  const task_list_div = document.getElementById("tasks_list_container");
  console.log(tasks_list);
  tasks_list.forEach((object) => {
    task_list_div.appendChild(object.element);
  });
}

function removeTaskFromList(task) {
  const index = tasks_list.findIndex((object) => {
    return object.text === task;
  });

  tasks_list.splice(index, 1);
  updateTasksAmount("-");
  if (tasks_amount === 0) {
    setSortButtonDisplay("none");
    setEmptyTasksDivDisplay("block");
    setBottomDivBarDisplay("none");
    setTasksDivContainerDisplay("none");
  }
  updatePendingTask();
}

function updateTasksAmount(action) {
  switch (action) {
    case "+": {
      tasks_amount++;
      break;
    }
    case "-": {
      tasks_amount--;
      break;
    }
  }
}

function injectNewTaskToHtml(task) {
  const task_div_tag = document.createElement("div");

  task_div_tag.className = "task_container";
  const task_p_tag = document.createElement("p");

  task_p_tag.className = "task";

  const delete_task_button = document.createElement("img");
  delete_task_button.className = "delete_task_button";
  delete_task_button.id = "delete_task_button";
  delete_task_button.src = "../assets/svg/delete.svg";

  delete_task_button.addEventListener("click", (event) => {
    removeTaskFromList(task);
    task_div_tag.remove();
    event.stopPropagation();
  });

  task_p_tag.innerText = task;

  task_div_tag.appendChild(task_p_tag);
  task_p_tag.appendChild(delete_task_button);

  const tasks_list_div = document.getElementById("tasks_list_container");

  let newObj = { text: task, element: task_div_tag };
  tasks_list.push(newObj);
  updateTasksAmount("+");
  updatePendingTask();
  tasks_list_div.appendChild(task_div_tag);

  task_div_tag.addEventListener("click", () => {
    alert(task_p_tag.innerText);
  });
}
