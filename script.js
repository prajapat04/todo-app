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

   tasks.push({task, completed : false});
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
        
        if(task.completed) {
           li.style.textDecoration = "line-through";
           li.style.color = "gray";
        }
        li.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const completeTask = document.createElement("button");
        completeTask.innerText = "✔️";
        completeTask.onclick = (e) => {
            e.stopPropagation();
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };
        
        const editTask = document.createElement("button");
        editTask.innerText = "Edit";
        editTask.onclick = (e) => {
            e.stopPropagation();
            editTask(index);
        }
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.onclick = () => confirmDelete(index);
        li.appendChild(completeTask);
        li.appendChild(editTask);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        
    });

   }

   function confirmDelete(index) {
     const result = confirm("Are you want to delete this list ?");
     if(result){
        deleteTask(index);
     }
   };

   let editingIndex = null;

    function editTask(index) {
        const task = tasks[index];
         document.getElementById("input-task").value = tasks[index].text;
         editingIndex = index;

         const addBtn = document.getElementById("add-task");
         addBtn.innerText = "Update";
         addBtn.onclick = updateTask;
    };

    function updateTask(index) {
        const input = document.getElementById("input-task");
        const newText = input.value.trim();


        if(newText === "") return;
        tasks[editingIndex].text = newText;
        editingIndex = null;
        input.value = "";

        const btn = document.getElementById("add-task");
        btn.innerText = "add task";
        btn.onclick = addTask;

        alert("Contect updated sucessfully.");
        saveTasks();
        displayTasks();


    }

    function resetForm(){
        document.getElementById("input-task").value = "";
    }



