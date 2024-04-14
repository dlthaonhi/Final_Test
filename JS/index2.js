const status_array = ['todo', 'doing', 'completed', 'blocked'];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout").addEventListener("click", logout);
});
function logout() {
    window.location.href = "./login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("new_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'block';
        document.querySelector(".new_todo_title").textContent = "Add new todo";
        document.getElementById("submit").style.display = 'block';
        document.getElementById("edit").style.display = 'none';
        document.getElementById("task_choice").style.display='none'
    });

    document.getElementById("close_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'none';
        resetForm();
    });

    document.getElementById("submit").addEventListener("click", storeNewTask);

    window.addEventListener("load", reload)

    dragDrop();
    reloadCounter();
});


function reload() {
    const taskList = JSON.parse(localStorage.getItem('todoList')) || [];
    status_array.forEach(status => {
        taskList.forEach(task => {
            if (task.status == status) renderTask(task,String(status+'List')); 
        });
        // console.log(String(status+'List'));
    })
    reloadCounter()
}




function reloadCounter() {
    const counts = {
        todoCount: 0,
        doingCount: 0,
        completedCount: 0,
        blockedCount:0
    };
    
    function incrementCountByString(string) {
        if (counts.hasOwnProperty(string + 'Count')) {
            counts[string + 'Count']++;
        }
    }
    status_array.forEach(status => {
        let dem =0;
        let taskList = JSON.parse(localStorage.getItem('todoList')) || [];
        taskList.forEach(task => 
            {
                if (task.status == status) incrementCountByString(String(status));

            })

        document.getElementById(String(status+'Counter')).textContent = counts[status + 'Count'];
    })
    const totalCount = Object.values(counts).reduce((acc, val) => acc + val, 0);
    localStorage.setItem('sumCounter', totalCount.toString());
}


function resetForm() {
    document.getElementById('new_cate').value = '';
    document.getElementById('new_title').value = '';
    document.getElementById('new_content').value = '';
    document.getElementById('new_cate').style.border = "1px solid black";
    document.getElementById('new_title').style.border = "1px solid black";
    document.getElementById('new_content').style.border = "1px solid black";
    console.log("da reset");
}

function checkValue(new_cate,new_title,new_content) {
    let check = 0;
    console.log(new_cate);
    if (!new_cate || (/^\s*$/.test(new_cate))) {
        console.log("Chưa nhập Category");
        document.getElementById('new_cate').style.border = "2px solid #ff0000";
        check ++;
    }
    else document.getElementById('new_cate').style.border = "2px solid #3BC057";
    if (!new_title || (/^\s*$/.test(new_title))) {
        console.log("Chưa nhập Title");
        document.getElementById('new_title').style.border = "2px solid #ff0000";
        check ++;
    }
    else document.getElementById('new_title').style.border = "2px solid #3BC057";
    if (!new_content || (/^\s*$/.test(new_content))) {
        console.log("Chưa nhập Content");
        document.getElementById('new_content').style.border = "2px solid #ff0000";
        check++;
    }
    else document.getElementById('new_content').style.border = "2px solid #3BC057";
    if (check > 0) return false;
    else return true;
}

function checkElement(element) {
    console.log(element);

    const value = element.value;

    if (!value || (/^\s*$/.test(value))) {
        console.log("Chưa nhập Category");
        document.getElementById(element.id).style.border = "2px solid #ff0000";
    }
    else document.getElementById(element.id).style.border = "2px solid #3BC057";

}

const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});


// -----STORE_NEW-----

// when click submit "add new task"

function storeNewTask() {
    const new_cate = document.getElementById('new_cate').value;
    const new_title = document.getElementById('new_title').value;
    const new_content = document.getElementById('new_content').value;
    
    let check= checkValue(new_cate,new_title,new_content); 
    if (check == true) {
        var taskIdCounter = localStorage.getItem('sumCounter')
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
        renderTask(task,String(task.status+'List'));

        document.getElementById("new_todo").style.display = 'none';
        resetForm();  
        reloadCounter();  
    }
    // console.log(typeof(new_cate));
    
}

var taskId;
function renderTask(task,addList) {
    if (task == null) return;
    const tasks = document.getElementById(String(addList));
    console.log("addList",String(addList));
    const li = document.createElement('li');
    li.classList.add("task_area");

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
            <div class="line"></div>
            <div class="task_main">
                <p>${task.content}</p>
            </div>
            <div class="task_date">
                <i class="fa-regular fa-clock"></i>
                <p>${date}</p>
            </div>
        </div>
    `;

    li.draggable = true;

    let radio = document.querySelector(`input[name="status"][value="${String(addList).replace(/List/g,'')}"]`);
    console.log(radio);
    radio.checked = true;     

    tasks.appendChild(li);

    // let status = task.status;
    // document.querySelector(`input[name="status"][value="${status}"]`).checked = true;


    const deleteButton = li.querySelector(".delete_task");
    deleteButton.addEventListener("click", function() {
        taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        deleteTask(taskId,'taskList');
    });

    const editButton =li.querySelector(".edit_task");
    editButton.addEventListener("click", function() {
        console.log("THIS: ",this)
        taskId = this.getAttribute("data-id");
        // getStatusInLocal()
        console.log("ID :", taskId);
        editTask(taskId);
    });
}

var taskList = JSON.parse(localStorage.getItem('todoList')) || [];
var oldStatus;
var newStatus;
// var radio;
//when click icon "Edit"
function editTask(taskId) {
    //Hien giao dien Edit
    resetForm();
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';

    taskList = JSON.parse(localStorage.getItem('todoList')) || [];
    editing_task = taskList.find(task =>  parseInt(task.id) == parseInt(taskId));
    console.log(editing_task);
    // console.log(editing_task);
    // if (editing_task == undefined) {
    //     let taskList = JSON.parse(localStorage.getItem(String(statusNow+'List'))) || [];
    //     editing_task = taskList.find(task => task.id == parseInt(taskId));    
    //     let radio = document.querySelector(`input[name="status"][value="${statusNow}"]`);
    //     console.log(radio);
    //     radio.checked = true;    
    // }
    document.getElementById('new_cate').value = editing_task.category;
    document.getElementById('new_title').value = editing_task.title;
    document.getElementById('new_content').value = editing_task.content;
    document.querySelector(`input[name="status"][value="${editing_task.status}"]`).checked = true;

    oldStatus = editing_task.status;
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("edit").addEventListener("click", function () {
        storeTask(taskId);
    });
});

function storeTask(taskId) {
    // console.log('hihi');
    // console.log(this);
    var radios = document.getElementsByName('status');
    for (var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            newStatus = radios[i].value;
            break;
        }
    }
    //luu radio vao html
    let radio = document.querySelector(`input[name="status"][value="${radios[i].value}"]`);
    console.log(radio);
    radio.checked = true;

    taskList = JSON.parse(localStorage.getItem('todoList')) || [];

    let editing_task_index = taskList.findIndex(task => task.id == parseInt(taskId));

    const new_cate = document.getElementById('new_cate').value;
    const new_title = document.getElementById('new_title').value;
    const new_content = document.getElementById('new_content').value;

    let check = checkValue(new_cate, new_title, new_content); 
    if (check == true) {
        const task = { 
            id: taskId,
            category: new_cate, 
            title: new_title, 
            content: new_content,
            status: newStatus
        };
        console.log("Index Task",editing_task_index, task);
    
        taskList[editing_task_index]=task;
        localStorage.setItem('todoList', JSON.stringify(taskList))

        // Set in HTLM
        const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
        taskElement.querySelector('.task_title_text p').textContent = new_cate;
        taskElement.querySelector('.task_title_text h4').textContent = new_title;
        taskElement.querySelector('.task_main p').textContent = new_content;  

        taskElement.className = `task_area ${task.status}`;

        if (oldStatus != newStatus) {
            taskElement.remove();
            renderTask(task,String(newStatus + 'List'))
            reloadCounter()         
        }

        document.getElementById("new_todo").style.display = 'none';
    
        resetForm();
    }

}

// -----DELETE-TASK-----
function deleteTask(taskId) {
    console.log("ID của task cần xóa:", taskId);

    //detele in HTML
    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    //delete in localStorage
    taskList = JSON.parse(localStorage.getItem('todoList')) || [];
    taskList = taskList.filter(task => {
        return parseInt(task.id) != parseInt(taskId);
        console.log("task_delete_id",task.id, '  ', taskId);
    });
    console.log("deleteList", taskList);
    localStorage.setItem('todoList', JSON.stringify(taskList));
    reloadCounter();
}


// -----DRAG-&-DROP-----

var lists = document.querySelectorAll(".main_area");

function dragDrop() {

    document.addEventListener('dragstart', function(e) {

        e.target.classList.add('dragging'); 
        taskId = e.target.querySelector(".edit_task").getAttribute("data-id");

        console.log("ID :", taskId);
        console.log('selected');
    })
        
    document.addEventListener('dragend', function(e) {
        e.target.classList.remove('dragging');
        console.log('end');                
    });
        
    lists.forEach(list => {
        list.addEventListener('dragover', function(e) {
            e.preventDefault(); 
            console.log('over');
        });
        list.addEventListener('drop', function(e) {
            e.preventDefault();
            console.log('drop:', e);
            console.log('drop');
            const draggedItem = document.querySelector('.dragging'); 
            if (draggedItem) list.appendChild(draggedItem);    
            console.log(String(list.id).replace(/List/g,''));
            newStatus = String(list.id).replace(/List/g,'');
            console.log('new status', newStatus);

            taskList = JSON.parse(localStorage.getItem('todoList')) || [];
            taskList.forEach(task => {
                if (task.id == taskId) {
                    task.status = newStatus;
                    console.log(task.status);
                }
            })
            localStorage.setItem('todoList', JSON.stringify(taskList));
            reloadCounter()
        });
    });
                 

}

var radios = document.getElementsByName('status');
function checkedRadio() {
    for (var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            radioValue = radios[i].value
            break;
        }
    }
}


function saveDrop(taskId,localList,oldList) {
    console.log("localList befor if: ",String(localList), JSON.parse(localStorage.getItem(String(localList))) || []);
    // console.log(localList,oldList);
    let oldTakeList = JSON.parse(localStorage.getItem(String(oldList))) || [];
        console.log("oldList: ",String(oldList), oldTakeList);
        console.log(taskId);
        let editing_task_index = oldTakeList.findIndex(task => task.id == parseInt(taskId));
        let localTakeList = JSON.parse(localStorage.getItem(String(localList))) || [];
        console.log("localList after if: ",String(localList), localTakeList);
        console.log(editing_task_index )

        
        if (localList !== oldList ) {
        

        console.log(oldTakeList[editing_task_index]);
        oldTakeList[editing_task_index].status = radioValue;
        if(oldTakeList[editing_task_index].id !== localTakeList.find(task => task.id = oldTakeList[editing_task_index].id)){
            localTakeList.push(oldTakeList[editing_task_index]);
            localStorage.setItem(String(localList),JSON.stringify(localTakeList));
        }
        
        console.log(taskId);
        deleteDrag(taskId,oldList);
    } 
}

function deleteDrag(taskId, deleteList) {
    console.log("ID của task cần xóa:", taskId);
    console.log("Danh sách cần xóa từ:", deleteList);

    // Lấy danh sách công việc từ localStorage hoặc một mảng trống nếu không có
    let taskList = JSON.parse(localStorage.getItem(deleteList)) || [];

    // Lọc các công việc có id khác với taskId
    taskList = taskList.filter(task => parseInt(task.id) != parseInt(taskId));

    console.log("Danh sách sau khi xóa:", taskList);

    // Cập nhật lại localStorage với danh sách mới
    localStorage.setItem(deleteList, JSON.stringify(taskList));

    // Reload số lượng công việc cho mỗi danh sách
    reloadCounter();
}
