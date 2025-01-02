const input = document.getElementById("input-box");
const addButton = document.getElementById("add-button");
const container = document.getElementById("container");
const list = document.getElementById("list");

window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
};

function addTask() {
    const task = input.value.trim();
    if (task !== "") {
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        input.value = "";
    }
}

function addTaskToDOM(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    listItem.classList.add("task");

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "X";
    removeBtn.onclick = function() {
        container.removeChild(listItem);
        removeTaskFromLocalStorage(task);
    };

    listItem.appendChild(removeBtn);
    container.appendChild(listItem);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
