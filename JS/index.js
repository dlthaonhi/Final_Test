    // -----OPEN_CLOSE_NEWTASK-----

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("new_task").addEventListener("click", redirectToNewTask);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("close_task").addEventListener("click", closeTask);
});

function redirectToNewTask () {
    document.getElementById("new_todo").style.display = 'block';
}

function closeTask () {
    document.getElementById("new_todo").style.display = 'none';
}

    // -----STORE_NEWTASK-----
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", storeNewTask);
});
const token = localStorage.getItem('taskList')

data = JSON.parse(token)
console.log(data);
var todos = document.querySelector('.main_area')

function storeNewTask () {

    const new_cate = document.getElementById('new_cate').value;
    const new_title = document.getElementById('new_title').value;
    const new_content = document.getElementById('new_content').value;
    
    //check taskList
    var taskList = JSON.parse( localStorage.getItem('taskList') )
    if (taskList===null) {

        taskList = [ ];
        localStorage.setItem('taskList', JSON.stringify(taskList));
    
    }

    const task = {
        category: new_cate,
        title: new_title,
        content: new_content,
        status: 'todo'
    }
    console.log(task);
    taskList.push(task)
    var json = JSON.stringify(taskList)
    const save = localStorage.setItem('taskList', json)

    closeTask()
    addNewTask(task)

    new_cate.value = ''
    new_content.value = ''
    new_title.value = ''
}



function addNewTask (task) {
    var li = document.createElement('li')
    li.innerHTML=`
    <div class="task_title">
        <div class="task_title_text">
            <p>${task.category}</p>
            <h4>${task.title}</h4>
        </div>
        <div class="task_title_icon">
            <i class="fa-regular fa-pen-to-square"></i>
            <i id="delete_task" class="fa-regular fa-trash-can"></i>
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
    `
    li.classList.add("task_area")

    

    todos.appendChild(li)

    var deleteButton = li.querySelector("#delete_task");
    deleteButton.addEventListener("click", deleteThisTask);
    
}

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("deleta_task").addEventListener("click", deleteThisTask);
// });

function deleteThisTask () {
    console.log('delete');
    this.parentElement.parentElement.parentElement.remove()
}

