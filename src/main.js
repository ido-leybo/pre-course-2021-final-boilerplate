const addButton = document.getElementById("add-button");
const sortButton = document.getElementById('sort-button');


const inputText = document.getElementById('text-input');
const viewSection = document.getElementById('viewSection'); 
const selector = document.getElementById("priority-selector");
const counter = document.getElementById('counter');
let todoCounter = 0;
let containerId = 0;
counter.innerText = todoCounter;
let todoListArr = [];
let sortArr = [];

// class Task {
//     constructor(text, priority) {}
// }
//add a "add" button to add more tasks to the Todo list every "click"
addButton.addEventListener("click", () => {
    addToContainer();
    // addTaskToViewSection();
    plusCounter();
    
});
    //add a done button to remove the task we done //need to work on

//need to work on
sortButton.addEventListener("click", () => {
    sortTasks()
});
function addTaskToViewSection() { 
    for (let task of todoListArr) {
        displayTask(task)
        todoCounter++;
        counter.innerText = todoCounter;
    } 
};
function plusCounter() {
    todoCounter++
    counter.innerText = todoCounter;
}
function deleteTaskView(event) {
    todoCounter--;
    counter.innerText = todoCounter;
    let removeDiv = event.target.parentElement;
    let id = removeDiv.id;
    console.log(todoListArr);
    removeDiv.remove();
    todoListArr = todoListArr.filter((task) => task.id !== parseInt(id));
    console.log(todoListArr);
}
function addToContainer() {
    let selectorValue = selector.value;
    let task = {
        id: containerId,
        priority: selectorValue,
        text: input_text(),
        date: getCurrentDate()
    };
    containerId++;
    todoListArr.push(task);
    displayTask(task);
};
function input_text() {
    let text = inputText.value;
    inputText.value = '';
    inputText.focus();
    return text;
};
function getCurrentDate() {
    const date = new Date(); 
    let nDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return nDate;
};
//need to work on
function sortTasks() {
    clean_presented_list();
    todoListArr = todoListArr.sort((a, b) => b.priority - a.priority);
    addTaskToViewSection()
}
function clean_presented_list() {
    while(viewSection.firstChild){
        viewSection.removeChild(viewSection.lastChild); // first it cleans the shown list;
    }
    todoCounter = 0;
    counter.innerText = todoCounter;
};
function displayTask(task) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('todo-container');
    mainDiv.setAttribute("id", `${task.id}`);
    const divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    const divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    const divText = document.createElement('div');
    divText.classList.add('todo-text');
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", event => {
        deleteTaskView(event)
    }); 
    divPriority.innerText = task.priority;
    divDate.innerText = task.date;
    divText.innerText = task.text;
    mainDiv.append(deleteButton);
    mainDiv.append(divPriority);
    mainDiv.append(divDate);
    mainDiv.append(divText);
    console.log(mainDiv);
    viewSection.appendChild(mainDiv);
}




function saveAsJson() {
};
function getJson() {
    return JSON.parse(localStorage.getItem("tasks"));
}
async function LoadJsonBin() {
    const response = await fetch('https://api.jsonbin.io/v3');
    const text = await response.text();
    const json = JSON.parse(text);
};


