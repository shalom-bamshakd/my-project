const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let task = {
        text: inputBox.value,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    inputBox.value = "";
    showTask();
}

function showTask() {
    listContainer.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.classList.add("task-checkbox");

        // ✅ FIX: Update the correct task on checkbox change
        checkbox.addEventListener("change", function () {
            let updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            updatedTasks[index].completed = this.checked;
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            showTask(); // Refresh the list
        });

        let taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        // ✅ Strike-through effect for completed tasks
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", function () {
            let updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            updatedTasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            showTask();
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}

showTask();

inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && inputBox.value.trim() !== '') {
        AddTask();
    }
});
