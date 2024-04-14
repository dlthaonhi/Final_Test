var taskIdCounter=0; 
const status_array = ['todo', 'doing', 'completed', 'blocked'];
var lists = document.querySelectorAll(".main_area");
var radioValue;
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

// let taskIdCounter = 0;
// var todoCounter = document.getElementById("todoCounter")
// todoCounter = taskIdCounter;


var taskId;
function addNewTask(task,addList) {
    if (task == null) return
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
    

    tasks.appendChild(li);


//    li.addEventListener('dragstart', function(e) {
//         // let selectedTask = e.target;
//         // e.dataTransfer.setData('text/plain', task.id);
//         taskId = this.getAttribute("data-id");
//         console.log("ID :", taskId);
//         console.log('selected');

//     lists.forEach(list => {
//         list.addEventListener('dragover', function(e) {
//             e.preventDefault(); // Ngăn chặn hành động mặc định khi kéo qua
//             // console.log('dragover:', e);
//             console.log('over');
//         });
//         list.addEventListener('drop', function(e) {
//             e.preventDefault(); // Ngăn chặn hành động mặc định khi thả
//             // const taskId = e.dataTransfer.getData('text/plain');
//             // const draggedTask = document.getElementById(taskId);
//             console.log('drop:', e);
//             console.log('drop');
//             this.appendChild(li);
//             // this.appendChild(draggedTask); // Thêm phần tử kéo vào phần tử mục tiêu
//         });
//     });
    
// })



    let status = task.status;
    document.querySelector(`input[name="status"][value="${status}"]`).checked = true;


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
        getStatusInLocal()
        console.log("ID :", taskId);
        editTask(taskId);
    });
}
var statusNow;
function getStatusInLocal() {
    status_array.forEach(status => {
        const taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
        taskList.forEach(task => {
            if (task.id == parseInt(taskId)) 
            {statusNow = task.status;
            return; }
        });
        // console.log(String(status+'List'), taskList);
    })  
    console.log("HUHU",statusNow);  
}

// DRAG&DROP

// let todoList = document.getElementById('todoList')
// let doingList = document.getElementById('doingList')
// let completedList = document.getElementById('completedList')
// let blockedList = document.getElementById('blockedList')

function dragDrop() {

    document.addEventListener('dragstart', function(e) {
        // let selectedTask = e.target;
        // e.dataTransfer.setData('text/plain', task.id);
        console.log(e.target);
        // oldList = String(radioButton.value + 'List')
        e.target.classList.add('dragging'); // Thêm lớp 'dragging' để chỉ định đối tượng đang được kéo
        taskId = e.target.querySelector(".edit_task").getAttribute("data-id");
        // console.log(e.target);
        status_array.forEach(status => {
            const taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
            taskList.find(task => {
                if(task.id == parseInt(taskId)) {
                    oldList = String (task.status+'List');
                    return ;

                }
            })
        })
        console.log(oldList);
        // console.log(JSON.parse(localStorage.getItem(String(oldList))) || []);
        console.log("ID :", taskId);
        console.log('selected');
        // saveDragStart();
    })
        
    document.addEventListener('dragend', function(e) {
        e.target.classList.remove('dragging'); // Loại bỏ lớp 'dragging' khi kết thúc kéo
        console.log('end');                
    });
        
    lists.forEach(list => {
        list.addEventListener('dragover', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định khi kéo qua
            console.log('over');
        });
        list.addEventListener('drop', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định khi thả
            console.log('drop:', e);
            console.log('drop');
            const draggedItem = document.querySelector('.dragging'); // Lấy đối tượng đang được kéo
            if (draggedItem) list.appendChild(draggedItem);    
            console.log(String(list.id).replace(/List/g,''));
            radioValue = String(list.id).replace(/List/g,'');
            console.log('new status', radioValue);
            document.querySelector(`input[name="status"][value="${radioValue}"]`).checked = true;
        
            localList = String(list.id);
            // console.log(JSON.parse(localStorage.getItem(String(localList))) || []);
                // checkedRadio();
            saveDrop(taskId,localList,oldList);
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

function saveDragStart() {
    checkedRadio();
    oldList = String(radioValue + 'List');
    console.log("old: ",oldList); 
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




// -----EDIT_TASK-----

var localList;
var oldList;
var deleteList;
var editing_task;
//Khi bam icon Edit
function editTask(taskId) {
    //Hien giao dien Edit
    resetForm();
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';
    // document.querySelector(".task_choice").style.display='flex';

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
    editing_task = taskList.find(task => task.id == parseInt(taskId));
    // console.log(editing_task);
    if (editing_task == undefined) {
        let taskList = JSON.parse(localStorage.getItem(String(statusNow+'List'))) || [];
        editing_task = taskList.find(task => task.id == parseInt(taskId));    
        let radio = document.querySelector(`input[name="status"][value="${statusNow}"]`);
        console.log(radio);
        radio.checked = true;    
    }
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
        parseInt(task.id) !== parseInt(taskId);
        console.log("task_delete_id",task.id, '  ', taskId);
    });
    console.log("deleteList", taskList);
    console.log(deleteList);
    localStorage.setItem(String(deleteList), JSON.stringify(taskList));
    reloadCounter();
}