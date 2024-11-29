const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks on page load
loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        const time = new Date();
        const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
        createTaskElement(task, formattedTime);
        taskInput.value = ''; // Clear input field
        saveTasks();
    } else {
        alert('Please enter a task');
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task, formattedTime) {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    // Task and timestamp container
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';

    // Task text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'task-text';
    taskContainer.appendChild(taskText);

    // Timestamp
    const timestampText = document.createElement('span');
    timestampText.textContent = formattedTime;  // Only display time
    timestampText.className = 'timestamp';
    taskContainer.appendChild(timestampText);

    // Append taskContainer to listItem
    listItem.appendChild(taskContainer);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';
    listItem.appendChild(deleteButton);

    // Insert new task at the top
    taskList.insertBefore(listItem, taskList.firstChild);

    // Delete button functionality
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTasks();  // Re-save tasks after deletion
    });
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function (item) {
        const taskText = item.querySelector('.task-text').textContent;
        const timestamp = item.querySelector('.timestamp').textContent.trim();  // Just save the time
        tasks.push({ task: taskText, timestamp: timestamp });  // Save task and timestamp
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Save tasks to localStorage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ task, timestamp }) => createTaskElement(task, timestamp));  // Load tasks with their timestamps
}
