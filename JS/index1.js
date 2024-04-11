var taskIdCounter=0; 
const status_array = ['todo', 'doing', 'completed', 'blocked'];

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
// var status_now;
// status_array.forEach(reload());

function reload() {
    status_array.forEach(status => {
        const taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
        taskList.forEach(task => {
            addNewTask(task,String(status+'List')); 
        });
        console.log(String(status+'List'), taskList);
    })
    
}

function reloadCounter() {
    status_array.forEach(status => {
        let dem =0;
        let taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
        taskList.forEach(task => 
            {
                dem++;
                console.log(dem);
            })
        console.log(dem);
        localStorage.setItem(String(status+'Count'),dem);
        
        let save_dem = document.getElementById(String(status+'Counter'))
        save_dem.textContent=dem;  
    })
 
}


function resetForm() {
    document.getElementById('new_cate').value = '';
    document.getElementById('new_title').value = '';
    document.getElementById('new_content').value = '';
}

const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// -----STORE_NEW-----

// khi bam nut submit "add new task"
function storeNewTask() {
    const new_cate = document.getElementById('new_cate').value;
    const new_title = document.getElementById('new_title').value;
    const new_content = document.getElementById('new_content').value;
    
    let check= checkValue(new_cate,new_title,new_content); 
    if (check == true) {
        var taskIdCounter = localStorage.getItem('todoCount')
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
    
        console.log(task.status);
        addNewTask(task,String(task.status+'List'));
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
function addNewTask(task,addList) {
    const tasks = document.getElementById(String(addList));
    console.log("addList",String(addList));
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
                <p>${date}</p>
            </div>
        </div>
    `;
    tasks.appendChild(li);


    let status = task.status;
    document.querySelector(`input[name="status"][value="${status}"]`).checked = true;
    // Lưu lại giá trị status vào localStorage khi radio button thay đổi
    // document.querySelectorAll('input[name="status"]').forEach(radio => {
    //     radio.addEventListener("change", function() {
    //         localStorage.setItem("status", this.value);
    //     });
    // });
    

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

// document.addEventListener("click", function(event) {
//     const target = event.target;

//     // Kiểm tra nếu nút "edit" được nhấn
//     if (target.classList.contains('edit_task')) {
//         const taskElement = target.closest('.task_area');
//         const taskId = taskElement.dataset.id; // Sử dụng dataset để lấy id
//         editTask(taskId);
//     }

//     // Kiểm tra nếu nút "delete" được nhấn
//     if (target.classList.contains('delete_task')) {
//         const taskElement = target.closest('.task_area');
//         const taskId = taskElement.dataset.id; // Sử dụng dataset để lấy id
//         deleteTask(taskId, 'taskList');
//     }
// });


// -----EDIT_TASK-----

var localList;
var oldList;
var deleteList;

//Khi bam icon Edit
function editTask(taskId) {
    //Hien giao dien Edit
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';

    // // console.log(this.status);
    // let statusOld = this.parentNode;
    // console.log(statusOld);

    var radios = document.getElementsByName('status');
    for (var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            break;
        }
    }

    let taskList = JSON.parse(localStorage.getItem(String(radios[i].value+'List'))) || [];
    let editing_task = taskList.find(task => task.id == parseInt(taskId));
    // console.log(editing_task);
    document.getElementById('new_cate').value = editing_task.category;
    document.getElementById('new_title').value = editing_task.title;
    document.getElementById('new_content').value = editing_task.content;
    oldList = editing_task.status + 'List';
    console.log("old: ",oldList);
    //checked_radio
    // console.log(editing_task.status);

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



function storeTask(taskId,localList,oldList) {
    console.log('hihi');
    var radios = document.getElementsByName('status');
    for (var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            break;
        }
    }
    //luu radio vao html
    let radio = document.querySelector(`input[name="status"][value="${radios[i].value}"]`);
    console.log(radio);
    radio.checked = true;

    localList = String(radios[i].value+'List');
    // if (radios[i].value == 'doing') localList = 'doingList';
    // if (radios[i].value == 'completed') localList = 'completedList';
    // if (radios[i].value == 'blocked') localList = 'blockedList';
    console.log(localList);

    
    // let taskList = JSON.parse(localStorage.getItem(String(localList))) || [];
    let oldTakeList = JSON.parse(localStorage.getItem(String(oldList))) || [];
    console.log("List ne", oldTakeList);
    let editing_task_index = oldTakeList.findIndex(task => task.id == parseInt(taskId));
    // var checkedradio = $('[name="status"]:radio:checked').val();

    let localTakeList = JSON.parse(localStorage.getItem(String(localList))) || [];

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

    if (String(localList) !== String(oldList)) {
        localTakeList.push(task);
        localStorage.setItem(String(localList),JSON.stringify(localTakeList))
        deleteTask(taskId,oldList);
        }
    else {
        oldTakeList[editing_task_index]=task;
        localStorage.setItem(String(oldList),JSON.stringify(oldTakeList))
        const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
        taskElement.remove();       
    }
    // localStorage.setItem(String(localList), JSON.stringify(taskList));

    document.getElementById("new_todo").style.display = 'none';


    reload();
    resetForm();

}


// -----DELETE-TASK-----
function deleteTask(taskId,deleteList) {
    console.log("ID của task cần xóa:", taskId);
    if (deleteList == 'taskList') {
        var radios = document.getElementsByName('status');
        for (var i=0;i<radios.length;i++) {
            if (radios[i].checked) {
                console.log(radios[i].value);
                break;
            }
        }
        deleteList=String(radios[i].value+"List")
    }

    console.log(deleteList);
    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    let taskList = JSON.parse(localStorage.getItem(String(deleteList))) || [];
    taskList = taskList.filter(task => {
        task.id !== parseInt(taskId);
        console.log("task_delete_id",task.id, '  ', taskId);
    });
    console.log("deleteList", taskList);
    console.log(deleteList);
    localStorage.setItem(String(deleteList), JSON.stringify(taskList));
    reloadCounter();
}