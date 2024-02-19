let toggle_btn = document.querySelector(".btn-moon");
let input = document.querySelector(".input")
let tasksUl = document.querySelector(".tasxs")
let info = document.querySelector(".info")
let btnInput = document.querySelector("span.bttn")
let tasxNumSpan = document.querySelector(".nmu-items span")
let message = document.querySelector(".message")
let idTask = 0;
let taskNum;
let tasks = get_task();
let type = "all"

// Dark mode
if(localStorage.getItem("theme") == "black"){
    document.body.classList.add("black");
} else{
    document.body.classList.remove("black");
    localStorage.setItem("theme","white")
}

toggle_btn.addEventListener("click",()=>{
    if(localStorage.getItem("theme") == "black"){
        document.body.classList.remove("black");
        localStorage.setItem("theme","white")
    } else{
        document.body.classList.add("black");
        localStorage.setItem("theme","black")
    }
});




function get_task(){
    return JSON.parse(localStorage.getItem("tasks"))? JSON.parse(localStorage.getItem("tasks")): []
}

// updata localstorage
function update_tasks(newTasks){
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    tasks = newTasks;

}

//update ul tasks

function updateUL(tasksShow){
    let lis = "";
    if(tasksShow == undefined){
        return 0;
    }
    tasksShow.forEach((task,i) => {
        lis +=
            `<li id=${++i} class="li ${task.completed} draggable="true"">
            <div class="rigth">
            <span class="bttn check"></span>
            ${task.tasx_content}
            </div>
            <div class="left delete">
                <img src="images/icon-cross.svg" alt="">
            </div>
          </li>`
    });
    tasksUl.innerHTML = lis;
    tasxNumSpan.innerHTML = tasksShow.length;

}
updateUL(tasks);

function checkAdd(){
    let value = input.value.trim();
   
    let task = {
        tasx_content: `${value}`,
        completed: "uncompleted"
    };
    tasks.push(task);
    update_tasks(tasks);
    updateUL(tasks);

    input.value = "";
}

// input keyup
input.addEventListener("keyup",(e)=>{
    let value = input.value.trim();
    if((e.keyCode == 13 ) && value!=""){
        checkAdd();   
    }
})

// add btn
btnInput.addEventListener("click",(e)=>{
    let value = input.value.trim();
    if(value!=""){
        checkAdd();   
    }
})


/////////

// delete function
function deleteTask(parent){
    --parent;
    tasks.forEach((tasx,i)=>{
        
        if(i == parent){
            tasks.splice(i,1);
            
            idTask--;
        }
    })
    update_tasks(tasks);
    updateUL(tasks);
}

// check function

function check(parent, parentNum){
    
    parentNum--;
        if(parent.classList.contains("completed")){
            tasks[parentNum].completed = "uncompleted";
            parent.classList.remove("completed")
            parent.classList.add("uncompleted")

        }else if(parent.classList.contains("uncompleted")){
            parent.classList.add("completed")
            parent.classList.remove("uncompleted")
            tasks[parentNum].completed = "completed";
        }
        update_tasks(tasks);
        updateUL(tasks);
}

// clear completed
function clearCompleted(){
    tasks = tasks.filter(task=> task.completed == "uncompleted");
    update_tasks(tasks);
  
}

// show task 

function showTask(){
    let taskWithType = [];
    tasks.forEach((task,i)=>{
        
        
        if(type == "active"){
            if(task.completed == "uncompleted"){
                taskWithType.push(task);
                
            }
        } else if(type == "completed"){
            if(task.completed == "completed"){
                taskWithType.push(task);
            }
        }else{
            taskWithType = tasks;
        }
    })
    updateUL(taskWithType);
    

}



tasksUl.addEventListener("click",(e)=>{
    let parent = e.target.parentElement.parentElement
    let parentNum = +(e.target.parentElement.parentElement.id)


    if(e.target.parentElement.classList.contains("delete")){
        deleteTask(parentNum);

    } else if(e.target.classList.contains("check") && type == "all"){
        check(parent, parentNum);  

    } else if(e.target.classList.contains("li") && type == "all"){
        check(e.target, +(e.target.id));  

    } else if(e.target.classList.contains("rigth") && type == "all"){
        check(e.target.parentElement, +(e.target.parentElement.id));  

    } else if(type != "all"){
        alert("Click on the All button to edit");
    }
})

info.addEventListener("click",(e)=>{
    
    if(e.target.classList.contains("clear")){
        clearCompleted();
        

    } else if(e.target.classList.contains("active")){
        type = "active";
        showTask();

    } else if(e.target.classList.contains("all")){
        type = "all"
        showTask();

    }else if(e.target.classList.contains("completed-btn")){
        
        type = "completed";
        showTask();
    }
    
})

