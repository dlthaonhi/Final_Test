var taskIdCounter=0; 
const status_array = ['todoList', 'doingList', 'completedList', 'blockedList'];
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

    window.addEventListener("load", reload)

    reloadCounter();


});
var status_now;
status_array.forEach(reload(status_now));

function reload(status_now) {
    const taskList = JSON.parse(localStorage.getItem(String(status_now))) || [];
    taskList.forEach(task => {
        addNewTask(task); 
    });
}

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
    
    let check= checkValue(new_cate,new_title,new_content); 
    if (check == true) {
        var taskIdCounter = localStorage.getItem('todo_count')
        const task = { 
            id: ++taskIdCounter,
            category: new_cate, 
            title: new_title, 
            content: new_content,
            status: 'todo'
        };
        
    
        let taskList = JSON.parse(localStorage.getItem('todoList')) || [];
        taskList.push(task);
        localStorage.setItem('todoList', JSON.stringify(taskList));
        console.log(taskList);
    
    
        addNewTask(task);
        // saveTodoList(task);
        document.getElementById("new_todo").style.display = 'none';
        resetForm();  
        reloadCounter();  
        // renderTasks()    
    }
    // console.log(typeof(new_cate));
    
    
}

function checkValue(new_cate,new_title,new_content) {
    let check = 0;
    console.log(new_cate);
    if (!new_cate || (/^\s*$/.test(new_cate))) {
        console.log("Chưa nhập Category");
        document.getElementById('new_cate').classList.add("check_false");
        check ++;
    }
    else document.getElementById('new_cate').classList.add("check_true");
    if (!new_title || (/^\s*$/.test(new_title))) {
        console.log("Chưa nhập Title");
        document.getElementById('new_title').classList.add("check_false");
        check ++;
    }
    else document.getElementById('new_title').classList.add("check_true");
    if (!new_content || (/^\s*$/.test(new_content))) {
        console.log("Chưa nhập Content");
        document.getElementById('new_content').classList.add("check_false");
        check++;
    }
    else document.getElementById('new_content').classList.add("check_true");
    if (check > 0) return false;
    else return true;
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

var taskId;
function addNewTask(task) {
    const todos = document.getElementById('todoList');
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
        taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        deleteTask(taskId,'taskList');
    });

    const editButton =li.querySelector(".edit_task");
    editButton.addEventListener("click", function() {
        taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        editTask(taskId);
    });

}


// -----EDIT_TASK-----

var localList;
var oldList;

function editTask(taskId) {
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';

    console.log(this.status);

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    let editing_task = taskList.find(task => task.id == parseInt(taskId));
    // console.log(editing_task);
    document.getElementById('new_cate').value = editing_task.category;
    document.getElementById('new_title').value = editing_task.title;
    document.getElementById('new_content').value = editing_task.content;
    oldList = editing_task.status + 'List';
    console.log("old: ",oldList);
    //checked_radio
    console.log(editing_task.status);

}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("edit").addEventListener("click", function () {
        // console.log("abc");
        storeTask(taskId,localList,oldList);
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


function storeTask(taskId,localList,oldList) {
    console.log('hihi');
    var radios = document.getElementsByName('status');
    for (var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            break;
        }
    }
    if (radios[i].value == 'todo') localList = 'taskList';
    if (radios[i].value == 'doing') localList = 'doingList';
    if (radios[i].value == 'completed') localList = 'completedList';
    if (radios[i].value == 'blocked') localList = 'blockedList';
    console.log(localList);

    
    let taskList = JSON.parse(localStorage.getItem(String(localList))) || [];
    console.log("List ne", taskList);
    let editing_task_index = taskList.findIndex(task => task.id == parseInt(taskId));
    // var checkedradio = $('[name="status"]:radio:checked').val();



    // console.log(ra);
    const task = { 
        id: taskId,
        category: document.getElementById('new_cate').value, 
        title: document.getElementById('new_title').value, 
        content: document.getElementById('new_content').value,
        status: radios[i].value
    };
    console.log(task);
    console.log(editing_task_index);

    if (editing_task_index <0) {
        taskList.push(task);
        deleteTask(taskId,oldList);
        }
    else taskList[editing_task_index]=task;
    localStorage.setItem(String(localList), JSON.stringify(taskList));

    document.getElementById("new_todo").style.display = 'none';

    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    reload();
    resetForm();

}


// -----DELETE-TASK-----
function deleteTask(taskId,deleteList) {
    console.log("ID của task cần xóa:", taskId);

    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    let taskList = JSON.parse(localStorage.getItem(String(deleteList))) || [];
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem(String(deleteList), JSON.stringify(taskList));
}