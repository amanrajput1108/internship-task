const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let count = 0;

// Add Task
addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="taskText">${taskInput.value}</span>
        <button class="deleteBtn">Delete</button>
    `;

    // Mark as Completed
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Delete Task
    li.querySelector(".deleteBtn").addEventListener("click", function (e) {
        e.stopPropagation();  // prevent complete toggle when deleting
        li.remove();
        count--;
        updateCount();
    });

    taskList.appendChild(li);
    count++;
    updateCount();
    taskInput.value = "";
});

// Update Count
function updateCount() {
    taskCount.innerText = `Total Tasks: ${count}`;
}