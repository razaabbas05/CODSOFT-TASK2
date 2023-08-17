const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${task}</p>
            <button class="editButton" data-index="${index}">Edit</button>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// ... existing code ...

renderTasks();

addButton.addEventListener("click", () => {
    const newTask = taskInput.value.trim();
    if (newTask !== "") {
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskInput.value = "";
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteButton")) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    } else if (event.target.classList.contains("editButton")) {
        const index = event.target.getAttribute("data-index");
        const updatedTask = prompt("Edit task:", tasks[index]);
        if (updatedTask !== null) {
            tasks[index] = updatedTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }
});
