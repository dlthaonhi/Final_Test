var taskIdCounter=0; 
const status_array = ['todo', 'doing', 'completed', 'blocked'];
var lists = document.querySelectorAll(".main_area");

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("new_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'block';
        document.querySelector(".new_todo_title").textContent = "Add new todo";
        document.getElementById("submit").style.display = 'block';
        document.getElementById("edit").style.display = 'none';
        document.querySelector(".task_choice").style.display=''

    });

    document.getElementById("close_task").addEventListener("click", function() {
        document.getElementById("new_todo").style.display = 'none';
        resetForm();
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
        console.log('i am here');
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


    li.addEventListener('dragstart', function(e) {
        console.log(li);
        // let selectedTask = e.target;
        // e.dataTransfer.setData('text/plain', task.id);

         status_array.forEach(status => {
        const taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
        taskList.forEach(task => {
            console.log(task);
            const list = document.getElementById(String(task.status)+'List');
            const listItems = list.querySelectorAll('li');
            console.log(listItems);

            listItems.forEach (item =>{
                item.querySelector(`input[name="status"][value="${task.status}"]`).checked = true;
            })

        });
        // console.log(String(status+'List'), taskList);
    })
        e.target.classList.add('dragging'); // Thêm lớp 'dragging' để chỉ định đối tượng đang được kéo
        taskId = li.querySelector(".edit_task").getAttribute("data-id");
        console.log("ID :", taskId);
        console.log('selected');
        saveDragStart();
    })

    li.addEventListener('dragend', function(e) {
        e.target.classList.remove('dragging'); // Loại bỏ lớp 'dragging' khi kết thúc kéo
        console.log('end');
        
    });

    lists.forEach(list => {
        list.addEventListener('dragover', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định khi kéo qua
            console.log('over');
        });
    });
    
    reload();

    let status = task.status;
    document.querySelector(`input[name="status"][value="${status}"]`).checked = true;


    const deleteButton = li.querySelector(".delete_task");
    deleteButton.addEventListener("click", function() {
        reload();
        taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        deleteTask(taskId,'taskList');
    });

    const editButton =li.querySelector(".edit_task");
    editButton.addEventListener("click", function() {
        reload();
        taskId = this.getAttribute("data-id");
        console.log("ID :", taskId);
        editTask(taskId);
    });

}

function addDropEventListeners() {
    // Lặp qua mỗi danh sách và chỉ gắn sự kiện 'drop' cho danh sách đó
    lists.forEach(list => {
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
            // let statusList = JSON.parse(localStorage.getItem(String(localList))) || [];



            // console.log(statusList);
            // checkedRadio();
            saveDrop(taskId,localList,oldList);

        });
    });
    
}

// Code khác ở đây...

// reload();
addDropEventListeners();

// function reloadStatus() {
//     status_array.forEach(status => {
//         const taskList = JSON.parse(localStorage.getItem(String(status+'List'))) || [];
//         taskList.forEach(task => {
//             console.log(task);
//             const list = document.getElementById(String(task.status)+'List');
//             const listItems = list.querySelectorAll('li');
//             console.log(listItems);

//             listItems.forEach (item =>{
//                 item.querySelector(`input[name="status"][value="${task.status}"]`).checked = true;
//             })

//         });
//         // console.log(String(status+'List'), taskList);
//     })
// }

// -----SAVE_DRAG-----

function saveDragStart() {
    checkedRadio();
    const draggedItem = document.querySelector('.dragging');
    if (draggedItem) {
        const statusElement = draggedItem.closest('.main_area');
        if (statusElement) {
            const status = statusElement.id.replace(/List$/, '');
            oldList = status + 'List';
            console.log("old: ", oldList); 
        }
    }
}


function saveDrop(taskId,localList,oldList) {
    if (localList !== oldList ) {
        let oldTakeList = JSON.parse(localStorage.getItem(String(oldList))) || [];
        console.log("oldList: ",String(oldList), oldTakeList);
        let editing_task_index = oldTakeList.findIndex(task => task.id == parseInt(taskId));
        let localTakeList = JSON.parse(localStorage.getItem(String(localList))) || [];
        console.log("localList: ",String(localList), localTakeList);
        // console.log()

        oldTakeList[editing_task_index].status = radioValue;
        console.log(oldTakeList[editing_task_index]);

        localTakeList.push(oldTakeList[editing_task_index]);
        localStorage.setItem(String(localList),JSON.stringify(localTakeList));
        console.log(taskId);
        deleteDrag(taskId,oldList);
        
        return;
    } 
}

function deleteDrag(taskId,deleteList) {
    console.log("ID của task cần xóa:", taskId);
    console.log(deleteList);

    let taskList = JSON.parse(localStorage.getItem(String(deleteList))) || [];
    console.log("taskId delete: ", taskId);
    taskList = taskList.filter(task => {
        return task.id !== parseInt(taskId);
    });
    console.log("deletedList", taskList);
    localStorage.setItem(String(deleteList), JSON.stringify(taskList));
    reloadCounter();   
    // reload();
}

// -----EDIT_TASK-----

var localList;
var oldList;
var deleteList;
var radioValue;
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


//Khi bam icon Edit
function editTask(taskId) {
    //Hien giao dien Edit
    resetForm();
    document.querySelector('.task_choice').style.display = 'flex';
    document.getElementById("new_todo").style.display = 'block';
    document.querySelector(".new_todo_title").textContent = "Edit Task";
    document.getElementById("submit").style.display = 'none';
    document.getElementById("edit").style.display = 'block';

    // // console.log(this.status);
    // let statusOld = this.parentNode;
    // console.log(statusOld);

    // checkedRadio();
    let radioValue = document.querySelector('input[name="status"]:checked').value;

    console.log(radioValue);
    let taskList = JSON.parse(localStorage.getItem(String(radioValue+'List'))) || [];
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


function storeTask(taskId,localList,oldList) {
    console.log('hihi');

    checkedRadio();
    //luu radio vao html
    let radio = document.querySelector(`input[name="status"][value="${radioValue}"]`);
    console.log(radio);
    radio.checked = true;

    localList = String(radioValue+'List');
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
            status: radioValue
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
        checkedRadio();
        deleteList=String(radioValue+"List")
    }

    console.log(deleteList);
    const taskElement = document.querySelector(`.delete_task[data-id="${taskId}"]`).closest('.task_area');
    taskElement.remove();

    let taskList = JSON.parse(localStorage.getItem(String(deleteList))) || [];
    console.log("taskId delete: ", taskId);
    taskList = taskList.filter(task => {
        // console.log(task);
        return task.id !== parseInt(taskId);
        // console.log("task_not_delete_id",task.id, '  ', taskId);
    });
    console.log("deletedList", taskList);
    console.log(deleteList);
    localStorage.setItem(String(deleteList), JSON.stringify(taskList));
    reloadCounter();
}