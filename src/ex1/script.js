let tasks_list = [];

const add_button = document.getElementById("add_button");
add_button.addEventListener("click", onClickAddTask);

const input = document.getElementById("task_input");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onClickAddTask();
  }
});

const clearAll_button = document.getElementById("clearAll_button");
clearAll_button.addEventListener("click", onClickClearAll);

function onClickAddTask() {
  let input_tag = document.getElementById("task_input");
  let value = input_tag.value;
  if (!input_tag.value) {
    alert("An empty task is for lazy pepole ;)");
    return;
  }
  if (tasks_list.length === 0) {
    setEmptyTasksDivDisplay("none");
  }
  input_tag.value = "";
  tasks_list.push(value);
  injectNewTaskToHtml(value);
  if (tasks_list.length === 1) {
    setBottomDivBarDisplay("flex");
    setTasksDivContainerDisplay("flex");
  }
  updatePendingTask();
}

function onClickClearAll() {
  const tasks_list_div = document.getElementById("tasks_list_container");
  tasks_list_div.innerHTML = "";
  resetTaskList();
}
function resetTaskList() {
  tasks_list = [];
  setBottomDivBarDisplay("none");
  setEmptyTasksDivDisplay("block");
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

function updatePendingTask() {
  let taskAmount = tasks_list.length;
  const pending_tasks_p_tag = document.getElementById(
    "amount_of_pending_tasks"
  );
  pending_tasks_p_tag.innerText = "You have " + taskAmount + " pending tasks";
}

function deleteTask(target) {
  console.log("inside");
  console.log(target);
}

function injectNewTaskToHtml(task) {
  updatePendingTask();
  const task_div_tag = document.createElement("div");
  task_div_tag.className = "task_container";
  const task_p_tag = document.createElement("p");

  task_p_tag.className = "task";

  const delete_task_button = document.createElement("img");
  delete_task_button.className = "delete_task_button";
  delete_task_button.id = "delete_task_button";
  delete_task_button.src = "../assets/svg/delete.svg";
  delete_task_button.addEventListener("click", (target) => {
    console.log(target.target);
    task_div_tag.remove();
  });

  task_p_tag.innerText = task;

  task_div_tag.appendChild(task_p_tag);
  task_p_tag.appendChild(delete_task_button);

  const task_list_div = document.getElementById("tasks_list_container");
  task_list_div.appendChild(task_div_tag);
}
