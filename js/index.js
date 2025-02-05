/* =========================== Global-DOM ===========================*/
let taskInput = document.getElementById("taskInput") ;
let todoscontainer = document.getElementById("todos-container")  ;
let mySelect = document.getElementById("mySelect") ;
let arrayOfTasks = [] ;
let alertmsg = document.getElementById("alertmsg") ;
let toDoregex = /^[a-zA-z]{4,50}$/;
/*=========================== Start-App =========================== */

startApp() ;

/* =========================== Functions ===========================*/
function startApp() {
    if(localStorage.getItem("toDoList")) {
        arrayOfTasks = JSON.parse(localStorage.getItem("toDoList")) ;
        displayTask(arrayOfTasks) ;
    }
}

function addTodo() {

    if(inputRegex(taskInput.value)) {
        let isDuplicate = arrayOfTasks.some(task => task.title.toLowerCase() === taskInput.value.toLowerCase());

        if (isDuplicate) {
            alertmsg.classList.remove("d-none") ;
            return;
        } else {
            alertmsg.classList.add("d-none") ;
        }
        let taskObject = {
            title : taskInput.value ,
            id : `${Math.random() * 10000}-${Math.random() * 10000}` ,
            statusTask : false ,
           }
           arrayOfTasks.push(taskObject);
           localStorage.setItem("toDoList" , JSON.stringify(arrayOfTasks)) ;
           clearInput() ;
           displayTask(arrayOfTasks) ;
    }

}
function clearInput() {
    taskInput.value = null ;
}
function displayTask(arr) {
    let box = ``
    for(let i = 0 ; i < arr.length ; i++) {
        if(arr[i].statusTask === true) {
            box += 
            `
                <div class="col-11 todo completed">
                <div class="row bg-dark">
                <div class="col-8  py-3 fs-5">${arr[i].title}</div>
                <div  onclick="isCompleted('${arr[i].id}')" id="succesBtn" class="col-2  py-3 bg-success d-flex justify-content-center"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
                <div onclick="deleteTask('${arr[i].id}')" id= "deleteBtn" class="col-2  py-3 bg-danger d-flex justify-content-center"><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
                </div>
                </div>
                `
        }else {
            box += 
            `
            <div class="col-11 todo ">                
                  <div class="row bg-dark">
                    <div class="col-8  py-3 fs-5">${arr[i].title}</div>
                    <div onclick="isCompleted('${arr[i].id}')" id="succesBtn" class="col-2  py-3 bg-success d-flex justify-content-center"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
                    <div onclick ="deleteTask('${arr[i].id}')" id= "deleteBtn" class="col-2  py-3 bg-danger d-flex justify-content-center"><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
                  </div>
                </div>
            `
        }
    }
    todoscontainer.innerHTML = box ; 
}
function deleteTask(taskId) {
    const taskIndex = arrayOfTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        arrayOfTasks.splice(taskIndex, 1);
        localStorage.setItem("toDoList", JSON.stringify(arrayOfTasks)); 
        displayTask(arrayOfTasks); 
    }
}

function inputRegex(term) {
    if(toDoregex.test(term)) {
        taskInput.classList.remove("is-invalid") ;
        taskInput.classList.add("is-valid") ;
        return true ;
    } else {
        taskInput.classList.remove("is-valid") ;
        taskInput.classList.add("is-invalid") ;
        return false ;
    }
}
function searching(term) {
    let searchingList = [] ;
    for(let i = 0 ; i < arrayOfTasks.length ; i++) {
        if(arrayOfTasks[i].title.includes(term)) {
            searchingList.push(arrayOfTasks[i]) ;
        }
        displayTask(searchingList) ;
    }
}

function isCompleted(taskId) {
    const taskIndex = arrayOfTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        arrayOfTasks[taskIndex].statusTask = !arrayOfTasks[taskIndex].statusTask;
        localStorage.setItem("toDoList", JSON.stringify(arrayOfTasks));
        displayTask(arrayOfTasks);
    } else {
        console.log("Task not found!");
    }
}
mySelect.addEventListener("change", function () {
    let completedtasks = [];
    let uncompletedtasks = [];

    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (mySelect.options.selectedIndex === 1 && arrayOfTasks[i].statusTask === true) {
            completedtasks.push(arrayOfTasks[i]);
        } else if (mySelect.options.selectedIndex === 2 && arrayOfTasks[i].statusTask === false) {
            uncompletedtasks.push(arrayOfTasks[i]);
        }
    }


    if (mySelect.options.selectedIndex === 1) {
        displayTask(completedtasks);
    } else if (mySelect.options.selectedIndex === 2) {
        displayTask(uncompletedtasks); 
    } else if (mySelect.options.selectedIndex === 0) {
        displayTask(arrayOfTasks); 
    }
});


