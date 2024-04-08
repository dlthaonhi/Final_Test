var taskIdCounter=0; 

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("new_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'block';
        document.querySelector(".new_todo_title").textContent = "Add new todo";
        document.getElementById("submit").style.display = 'block';
        document.getElementById("edit").style.display = 'none';
    });

    document.getElementById("close_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'none';
    });

    document.getElementById("submit").addEventListener("click", storeNewTask);

    window.addEventListener("load", function() {
        const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
        taskList.forEach(task => {
            addNewTask(task); 
        });
    });

    reloadCounter();


});

function reloadCounter() {
    let dem =0;
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.forEach(task => 
        {
            dem++;
            console.log(dem);
        })
    console.log(dem);
    localStorage.setItem('todo_count',dem);
    
    let todo_dem = document.getElementById("todoCounter")
    todo_dem.textContent=dem;   
}


// -----STORE_NEW-----

function storeNewTask() {
    const new_cate = document.getElementById('new_cate').value;
    const new_title = document.getElementById('new_title').value;
    const new_content = document.getElementById('new_content').value;
    if (!new_cate) {
        alert ("Chưa nhập Category")
        return false
    }
    if (!new_title) {
        alert ("Chưa nhập Title")
        return false
    }
    if (!new_content) {
        alert ("Chưa nhập Content")
        return false
    }
    
    var taskIdCounter = localStorage.getItem('todo_count')
    const task = { 
        id: ++taskIdCounter,
        category: new_cate, 
        title: new_title, 
        content: new_content,
        status: 'todo'
    };
    

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    console.log(taskList);


    addNewTask(task);
    // saveTodoList(task);
    document.getElementById("new_todo").style.display = 'none';
    resetForm();  
    reloadCounter();  
    // renderTasks()
}

// let taskIdCounter = 0;
// var todoCounter = document.getElementById("todoCounter")
// todoCounter = taskIdCounter;

function renderTasks(taskList = []) {
    let content = '<ul>'

    taskList.forEach( (task) => {
        content += `<li class="task_area">
                            <div class="task_title">
                                <div class="task_title_text">
                                    <p>Marketing</p>
                                    <h4>Write SEO article for new product</h4>
                                </div>
                                <div class="task_title_icon">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    <i class="fa-regular fa-trash-can"></i>
                                </div>
                            </div>
                            <div class="task_content">
                                <div class="task_main">
                                    <p>This is an existential moment for effective altruism and the rationalist community writ-large. </p>
                                </div>
                                <div class="task_date">
                                    <i class="fa-regular fa-clock"></i>
                                    <p>June 30, 2022</p>
                                </div>
                            </div>
                        </li>`
    })

    content += '</ul>'

    document.querySelector("#result").innerHTML = content ;
}


function addNewTask(task) {
    const todos = document.querySelector('.main_area');
    const li = document.createElement('li');
    li.classList.add("task_area");
    // const taskId = taskIdCounter;
    li.innerHTML = `
        <div class="task_title">
            <div class="task_title_text">
                <p>${task.category}</p>
                <h4>${task.title}</h4>
            </div>
            <div class="task_title_icon">
                <i class="edit_task fa-regular fa-pen-to-square" data-id="${task.id}"></i>
                <i class="delete_task fa-regular fa-trash-can" data-id="${task.id}"></i>
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

    const deleteButton = li.querySelector(".delete_task");
    deleteButton.addEventListener("click", function() {
        const taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        deleteTask(taskId);
    });

    const editButton =li.querySelector(".edit_task");
    editButton.addEventListener("click", function() {
        const taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        editTask(taskId);
    });

}


// -----EDIT_TASK-----

function editTask(taskId) {
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    let editing_task = taskList.find(task => task.id == parseInt(taskId));
    console.log(editing_task);
    document.getElementById('new_cate').value = editing_task.category;
    document.getElementById('new_title').value = editing_task.title;
    document.getElementById('new_content').value = editing_task.content;

    
}
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("edit").addEventListener("click", function () {
            console.log("abc");
            // storeTask(taskId);
        });
});
// function saveTodoList(task) {
//     let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
//     taskList.push(task);
//     localStorage.setItem('taskList', JSON.stringify(taskList));
// }

function resetForm() {
    document.getElementById('new_cate').value = '';
    document.getElementById('new_title').value = '';
    document.getElementById('new_content').value = '';
}


function storeTask(taskId) {
    console.log('hihi');
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    let editing_task_index = taskList.findIndex(task => task.id == parseInt(taskId));
    const task = { 
        id: taskId,
        category: document.getElementById('new_cate').value, 
        title: document.getElementById('new_title').value, 
        content: document.getElementById('new_content').value,
        status: 'todo'
    };
    taskList[editing_task_index]=task;

    document.getElementById("new_todo").style.display = 'none';

}


// -----DELETE-TASK-----
function deleteTask(taskId) {
    console.log("ID của task cần xóa:", taskId);

    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem('taskList', JSON.stringify(taskList));
}