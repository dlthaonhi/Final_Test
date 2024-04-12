console.log("lists ", lists);

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");

    let tasks = document.querySelectorAll(".task_area");
    console.log("tasks ", tasks);

    tasks.forEach(task => {
        task.addEventListener('dragstart', function(e) {
            let selectedTask = e.target;
            console.log('selected');
    
            lists.forEach(list => {
                list.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.appendChild(selectedTask)
                    console.log('over');
                })
                list.addEventListener('drop', function(e) {
                    e.preventDefault();
                    console.log('drop');
                    this.appendChild(selectedTask)
                })
            })
        })
    })
})


// -----DRAG_&_DROP-----

function dragDrop () {
    
    // let tasks = document.querySelectorAll(".task_area");
    // console.log("tasks ", tasks);

    // tasks.forEach(task => {
    //     task.addEventListener('dragstart', function(e) {
    //         let selectedTask = e.target;
    //         console.log('selected');
    
    //         lists.forEach(list => {
    //             list.addEventListener('dragover', function(e) {
    //                 e.preventDefault();
    //                 this.appendChild(selectedTask)
    //                 console.log('over');
    //             })
    //             list.addEventListener('drop', function(e) {
    //                 e.preventDefault();
    //                 console.log('drop');
    //                 this.appendChild(selectedTask)
    //             })
    //         })
    //     })
    // })

    // document.addEventListener("dragstart", (e) => {
    //     // e.target.classList.add("is-dragging");
    //     // var selectedTask = e.target;
    //     e.dataTransfer.setData('text/plain', 'dragging');
    //     console.log('selected');
    // })

    // // document.addEventListener("dragend", (e) => {
    // //     e.target.classList.remove("is-dragging");
    // // })
    
    // lists.forEach((list) => {
    //     list.addEventListener("dragover", (e) => {
    //         e.preventDefault();
    //     })

    //     list.addEventListener("drop", (e) => {
    //         e.preventDefault();
    //         const taskId = e.dataTransfer.getData('text/plain');
    //         const draggedTask = document.getElementById(taskId);
    //         this.appendChild(draggedTask);
    //         // let selected = e.target;
    //         // if(selected){
    //         //     list.appendChild(selected);
    //         //     saveList();
    //         // }
    //         editTask(taskId)
    //     })
    // })

    // document.addEventListener("dragstart", (e) => {
    //     e.target.classList.add("is-dragging");
    // })

    // document.addEventListener("dragend", (e) => {
    //     e.target.classList.remove("is-dragging");
    // })
    
    // lists.forEach((list) => {
    //     list.addEventListener("dragover", (e) => {
    //         e.preventDefault();
    //     })

    //     list.addEventListener("drop", (e) => {
    //         e.preventDefault();

    //         let selected = document.querySelector(".is-dragging");
    //         if(selected){
    //             list.appendChild(selected);
    //             // saveList();
    //         }
    //     })
    // })
}
