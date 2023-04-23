// Selecting elements

const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter");
const clearButton = document.getElementById("clear-todos");

eventListeners();


function eventListeners(){ // all event listeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodostoUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}


function addTodo(e){
    let todos = getTodosFromStorage();
    const newTodo = todoInput.value.trim();

    if (JSON.stringify(todos).includes(newTodo) === true){
            showAlert("danger","Please add a new task!")
        } 
    else if (newTodo === "" |  " "){  
        showAlert("danger","Please add a task")
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","A new task has been created successfully!")
    }       

    e.preventDefault();
}


function addTodoToUI(newTodo){ // adds the string value it gets as a list item
    // Creating list item
    const listItem = document.createElement("li");
    // Creating link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Adding text node

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Adding list item to the ToDoList

    todoList.appendChild(listItem);
    todoInput.value = "";

}

function getTodosFromStorage(){ // Getting all tasks from the storage
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else(
        todos = JSON.parse(localStorage.getItem("todos"))
    )
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodostoUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = "alert alert-"+type;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // set timeout
    setTimeout(function(){
        alert.remove();
    },2000);
    
}

function deleteTodo(e){
    
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Task has been removed successfully")
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1) // Deleting item from the array 
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue)=== -1){
            // It couldn't find, don't show if it isn't found
            listItem.setAttribute("style","display: none !important")
        }
        else{
            listItem.setAttribute("style","display: block")
        }

    })

}


function clearAllTodos(e){
    if (confirm("Are you sure deleting all tasks?")){
    // Removing from the UI
    //todoList.innerHTML = ""; // Same thing but slower
    while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
    showAlert("success","All tasks has been deleted successfully!")
}
}










