//Define UI

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.getElementsByName("filter")[0]
const clearBtn = document.querySelector(".clear-tasks");

// Load all event listerners
loadEventListeners();

function loadEventListeners() {
  // submit
  form.addEventListener("submit", addTask);

  // Remove element
  taskList.addEventListener("click", removeElement);

  // Clear tasks
  clearBtn.addEventListener("click", clearTasks);

  // Filteration of tasks
 
  filter.addEventListener('keyup', searchFilter);
  
}

// Add tasks

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add some task");
  }

  // Create tasks in local storage
  tasksinLocalStorage(taskInput.value)


  
  // Store tasks in Local Storage
 storeTasksinLocalStorage(taskInput.value);

// Clear task input
  taskInput.value = "";
  e.preventDefault();
}


function tasksinLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') ===  null){
        tasks = []
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

      // Create list tags and add to UI
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));

  // create link element with delete icon

  const link = document.createElement("a");
  // Add class name
  link.className = "delete-item secondary-content";

  // Add icon
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

}

// Delete all tasks

function clearTasks() {
  taskList.innerHTML = "";
}

// Filter tasks

function searchFilter(e){
let text = e.target.value.toLowerCase();

document.querySelectorAll('.collection-item').forEach(function(task) {

    // TO Do////
    if(task.firstChild.textContent.toLowerCase().indexOf(text) > -1){
        task.style.display = 'block'
       }  else{
           task.style.display = 'none'
       }
  });
  


}

// Delete single task
function removeElement(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      e.target.parentElement.parentElement.remove();
    }
    e.preventDefault();
  }

// Store tasks in local storage
function storeTasksinLocalStorage(task){
 let tasks;

 if(localStorage.getItem('tasks') ===  null){
     tasks = []
 } else{
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }

 tasks.push(task)
 localStorage.setItem('tasks', JSON.stringify(tasks));

}

