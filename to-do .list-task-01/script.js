document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(taskItem);

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function editTask(taskItem) {
    const taskSpan = taskItem.querySelector('span');
    const newTaskText = prompt('Edit your task', taskSpan.textContent);
    if (newTaskText !== null) {
        const oldTaskText = taskSpan.textContent;
        taskSpan.textContent = newTaskText;
        updateTask(oldTaskText, newTaskText);
    }
}

function deleteTask(taskItem) {
    const taskSpan = taskItem.querySelector('span');
    taskItem.remove();
    removeTask(taskSpan.textContent);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldTaskText, newTaskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(oldTaskText);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(taskText);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(taskItem);

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}