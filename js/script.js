let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate");

  if (taskInput.value.trim() === "") return;

  const task = {
    text: taskInput.value,
    due: dueDate.value,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  dueDate.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = `
      <tr class="border-b border-gray-700">
        <td class="p-2">${task.text}</td>
        <td class="p-2">${task.due || "-"}</td>
        <td class="p-2">
          <span class="px-2 py-1 rounded-lg text-sm ${task.completed ? "bg-green-600" : "bg-yellow-600"}">
            ${task.completed ? "Completed" : "Pending"}
          </span>
        </td>
        <td class="p-2 flex gap-2">
          <button onclick="toggleTask(${index})" class="bg-blue-500 px-2 py-1 rounded-lg text-sm">
            ${task.completed ? "Undo" : "Done"}
          </button>
          <button onclick="deleteTask(${index})" class="bg-red-500 px-2 py-1 rounded-lg text-sm">Delete</button>
        </td>
      </tr>
    `;
    taskList.innerHTML += row;
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("totalTasks").innerText = total;
  document.getElementById("completedTasks").innerText = completed;
  document.getElementById("pendingTasks").innerText = pending;
  document.getElementById("progress").innerText = progress + "%";
}
