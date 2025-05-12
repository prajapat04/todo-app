const toggle = document.getElementById("toggle-mode");
const body = document.body;

if(localStorage.getItem("dark-mode") === "enabled"){
    body.classList.add("dark-mode");
    toggle.textContent = "☀️";
}

toggle.addEventListener("click", ()  => {
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("dark-mode", "enabled");
        toggle.textContent = "☀️";
    }  else {
        localStorage.setItem("dark-mode", "disabled");
        toggle.textContent = "🌙";
    }
});

let tasks = [];

window.onload = function () {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    displayTasks();
  }
};
function addTask(){
    const input = document.getElementById("input-task");
    const task = input.value.trim();
    
    if(task === ""){ 
     alert("task cannot be empty!");
        return;
    }

    if(tasks.includes(task)){
    alert("Already added this task.");
    return;
   }

   tasks.push(task);
   input.value = "";
   saveTasks();
   displayTasks();
}


   function deleteTask(index){
       tasks.splice(index, 1);
       saveTasks();
       displayTasks();
    }
    
    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    function displayTasks() {
       const list = document.getElementById("task-list");
       list.innerText = "";

       tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task;
        
        const completeTask = document.createElement("button");
        completeTask.innerText = "Complete";
        completeTask.onclick = () => completeTask(index);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.onclick = () => confirmDelete(index);
        li.appendChild(completeTask);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        
    });

   }

   function confirmDelete(index) {
     const result = confirm("Are you want to delete this list ?");
     if(result){
        deleteTask(index);
     }
   }



