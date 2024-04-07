document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("new_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'block';
    });

    document.getElementById("close_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'none';
    });

    document.getElementById("submit").addEventListener("click", function() {
        const new_cate = document.getElementById('new_cate').value;
        const new_title = document.getElementById('new_title').value;
        const new_content = document.getElementById('new_content').value;
        const task = { 
            id: ++taskIdCounter,
            category: new_cate, 
            title: new_title, 
            content: new_content };
        addNewTask(task);
        saveTodoList(task);
        document.getElementById("new_todo").style.display = 'none';
        resetForm();
    });

    window.addEventListener("load", function() {
        const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
        taskList.forEach(task => addNewTask(task));
    });
});

let taskIdCounter = 0;

function addNewTask(task) {
    const todos = document.querySelector('.main_area');
    const li = document.createElement('li');
    li.classList.add("task_area");
    const taskId = taskIdCounter;
    li.innerHTML = `
        <div class="task_title">
            <div class="task_title_text">
                <p>${task.category}</p>
                <h4>${task.title}</h4>
            </div>
            <div class="task_title_icon">
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="delete-task fa-regular fa-trash-can" data-id="${taskId}"></i>
            </div>
        </div>
        <div class="task_content">
            <div class="task_main">
                <p>${task.content}</p>
            </div>
            <div class="task_date">
                <i class="fa-regular fa-clock"></i>
                <p>June 30, 2022</p>
            </div>
        </div>
    `;
    todos.appendChild(li);

    const deleteButton = li.querySelector(".delete-task");
    deleteButton.addEventListener("click", function() {
        const taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        deleteTask(taskId);
    });
}

function deleteTask(taskId) {
    console.log("ID của task cần xóa:", taskId);

    const taskElement = document.querySelector(`.delete-task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function saveTodoList(task) {
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function resetForm() {
    document.getElementById('new_cate').value = '';
    document.getElementById('new_title').value = '';
    document.getElementById('new_content').value = '';
}