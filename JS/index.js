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

function storeNewTask () {
    const token = localStorage.getItem('taskList')

    data = JSON.parse(token)
    console.log(data);
    
    function register() {
    
        
        const new_cate = document.getElementById('new_cate').value;
        const new_title = document.getElementById('new_title').value;
        const new_content = document.getElementById('new_content').value;
    
        //check taskList
        var taskList = JSON.parse( localStorage.getItem('taskList') )
        if (taskList===null) {
    
            taskList = [ ];
            localStorage.setItem('taskList', JSON.stringify(taskList));
    
        }
    
        // // console.log(new_username, new_password);
        // register_check=0
        // for (var i=0;i<data.length; i++) {
        //     if (data[i].username == new_username) {
        //         register_check = 1
        //         alert ("This username is taken. Try another.")
        //         console.log("taken");
        //         break
        //     }
        // }
    
        // if (register_check == 0) {
            
        // }
        const task = {
            category: new_cate,
            title: new_title,
            content: new_content,
            type: todo
        }
        taskList.push(task)
        var json = JSON.stringify(taskList)
        // console.log(json);
        // userList[userList.length+1] = user
        // var json = JSON.stringify(user)
        const save = localStorage.setItem('taskList', json)
        // console.log(save);
        // redirectToLogin();
    
    }
}



