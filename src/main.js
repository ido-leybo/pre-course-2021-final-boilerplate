const addButton = document.getElementById("add-button");
const sortButton = document.getElementById('sort-button');
const inputText = document.getElementById('text-input');
const viewSection = document.getElementById('viewSection'); 
const selector = document.getElementById("priority-selector");
const counter = document.getElementById('counter');
const searchButton = document.getElementById("search-button");
const loading = document.getElementById("loading");
const undoButton = document.getElementById("undo-button");
const darkModeButton = document.getElementById("dark-mode");
const helpButton = document.getElementById("help-button");
const finalDateSelect = document.getElementById("final-date");

let tasksCounter = 0;
let containerId = 0;
let todoListArr = [];
let searchTodoArr = [];
let idArr = [];
let loadingPage = true;
let darkMode = false;
let searchText = true;

counter.innerText = tasksCounter;
//undo section
let prevDeleted;
let isPreviousAddAction = false;
//add a "add" button to add more tasks to the Todo list every "click"
addButton.addEventListener("click", () => {
    taskToList();
    increaseTasksCounter();
});
searchButton.addEventListener("click", searchGoTo);
//add a sort button to sort the list by priority value
sortButton.addEventListener("click", sortTasks);
undoButton.addEventListener("click", undo);
darkModeButton.addEventListener("click", darkModeAction);
helpButton.addEventListener("click", help);
function help() {
   alert('Enter your task to do to the input section, and click on "add" button\nif you want to sort the list by priority, click on "sort" button.\n\nyou can sort just by priority!\n\nif do you have more question you can contact me in facebook\nat the bottom of the page, or in github.')
};
function darkModeAction() {
    if (!darkMode) {
        darkModeButton.style.background = 'brown';
        darkModeButton.style.color = 'white';
        helpButton.style.background = 'brown';
        helpButton.style.color = 'white';
        document.body.style.backgroundColor = 'darkblue';
        inputText.style.backgroundColor = 'rgb(46, 44, 44)';
        inputText.style.color = 'white';
        addButton.style.backgroundColor = 'rgb(46, 44, 44)';
        addButton.style.color = 'white';
        searchButton.style.backgroundColor = 'rgb(46, 44, 44)';
        searchButton.style.color = 'white';
        undoButton.style.backgroundColor = 'rgb(39, 4, 4)';
        undoButton.style.color = 'white';
        sortButton.style.backgroundColor = 'rgb(39, 4, 4)';
        sortButton.style.color = 'white';
        selector.style.backgroundColor = 'rgb(39, 4, 4)';
        selector.style.color = 'gray';
        darkMode = true;
    } else {
        darkModeButton.style.background = 'darkgray';
        darkModeButton.style.color = 'black';
        helpButton.style.background = 'darkgray';
        helpButton.style.color = 'black';
        document.body.style.backgroundColor = 'rgb(217, 171, 42)'
        inputText.style.backgroundColor = 'white';
        inputText.style.color = 'black';
        addButton.style.backgroundColor = '#b7deee';
        addButton.style.color = 'black';
        searchButton.style.backgroundColor = '#b7deee';
        searchButton.style.color = 'black';
        undoButton.style.backgroundColor = ' rgb(184, 158, 110)';
        undoButton.style.color = 'black';
        sortButton.style.backgroundColor = ' rgb(184, 158, 110)';
        sortButton.style.color = 'black';
        selector.style.backgroundColor = 'rgb(184, 158, 110)';
        selector.style.color = 'black';
        darkMode = false;
    }
};
function undo(){
    clean_presented_list();
    if(isPreviousAddAction){
        todoListArr.pop();
    } else {
        todoListArr.push(prevDeleted[0]);
    }
    counter.innerText = todoListArr.length;
    getAndShow(todoListArr);
    undoButton.hidden = true;
};
function increaseTasksCounter() {
    tasksCounter++
    counter.innerText = tasksCounter;
};
function searchGoTo() {
    let text = input_text();
    searchTodoArr = todoListArr.filter(task => task.text.includes(text));
    console.log(searchTodoArr);
    clean_presented_list();
    getAndShow(searchTodoArr);
    if (searchText) {
        searchButton.innerHTML = 'Refresh&#10560;';
        searchText = false;
    } else {
        searchButton.innerHTML = 'search&#128270';
        searchText = true;
    }
};
function getAndShow(tasksToDisplay) { // get the list from the sort action or local storage or undo action and show it in the html
    if (tasksToDisplay[0]) {
        for (let task of tasksToDisplay) {     
            displayTask(task);
            tasksCounter++;
            counter.innerText = tasksCounter;
        }
    }return;
};
function taskToList() { // put every task in the main list
    let selectorValue = selector.value;
    const text = input_text();
    let task = {
        taskId: `${text}${containerId}`,
        priority: selectorValue,
        text: text,
        date: getCurrentDate(),
        finalDate: finalDateSelect.value,
        checked: false
    };
    containerId++;
    displayTask(task);
    todoListArr.push(task);
    jsonBinUpdateTask(todoListArr);
    // localStorage.setItem('my-todo', JSON.stringify(todoListArr));
    isPreviousAddAction = true;
    undoButton.hidden = false;
};
function deleteTaskView(event) {  // delete a task from the list and from the local storage.
    tasksCounter--;
    counter.innerText = tasksCounter;

    let removeDiv = event.target.parentElement;
    let id = removeDiv.id;
    //prev section
    isPreviousAddAction = false;
    prevDeleted = todoListArr.filter((task) => task.taskId === id);
    undoButton.hidden = false;

    removeDiv.remove();
    console.log(localStorage);
    todoListArr = todoListArr.filter((task) => task.taskId !== id);
    console.log(todoListArr)
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
    jsonBinUpdateTask(todoListArr);
}
function input_text() {
    let text = inputText.value;
    inputText.value = '';
    inputText.focus();
    return text;
};
function getCurrentDate() { // get the time that clicked
    const date = new Date(); 
    let nDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return nDate;
};
function sortTasks() {  // sort the list by priority
    clean_presented_list();
    todoListArr = todoListArr.sort((a, b) => b.priority - a.priority);
    getAndShow(todoListArr);
}
function clean_presented_list() { // first it cleans the shown list before the sort action
    while(viewSection.firstChild){
        viewSection.removeChild(viewSection.lastChild); 
    }
    tasksCounter = 0;
    counter.innerText = tasksCounter;
};
function displayTask(task) { // put the task in div's and show them in the html
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", event => {
        deleteTaskView(event)
    });
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('todo-container');
    mainDiv.setAttribute("id", `${task.taskId}`);
    mainDiv.setAttribute("draggable", true);
    const divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    const divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    const divText = document.createElement('div');
    divText.setAttribute("class", 'todo-text');
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "checkbox");
    if (task.checked) {
        checkBox.setAttribute("checked", true);
        mainDiv.style.textDecoration = "line-through"
    }
    checkBox.addEventListener('change', function (event) {
        if (this.checked) {
            task.checked = true;
            event.target.parentElement.style.textDecoration = "line-through"
        } else {
            task.checked = false;
            event.target.parentElement.style.textDecoration = "none"
        }
      });
    divPriority.innerText = task.priority;
    divDate.innerText = `Start: ${task.date}\nUntil: ${task.finalDate}`;
    divText.innerText = task.text;
    mainDiv.append(deleteButton);
    mainDiv.append(checkBox);
    mainDiv.append(divPriority);
    mainDiv.append(divDate);
    mainDiv.append(divText);
    console.log(mainDiv);
    viewSection.appendChild(mainDiv);
};
// jsonbin functions
async function jsonBinUpdateTask(updatedtasks) {
    const response = await fetch("https://api.jsonbin.io/v3/b/6012c8c99f55707f6dfd4278", {
        method: "PUT",
        headers: {
                'Content-Type': "application/json",
                'X-Master-Key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f."             
            },
        body: JSON.stringify({"my-todo": updatedtasks})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            console.error(error)
        });
    console.log(response);
};
async function jsonBinGetTasks() {
    try {
        const allTasks = await fetch("https://api.jsonbin.io/v3/b/6012c8c99f55707f6dfd4278", {
            method: "GET",
            headers: {
                'X-Master-Key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f."
            },
        })
        const text = await allTasks.text();
        const json = JSON.parse(text);
        return json.record["my-todo"];
    } catch (error) {
        console.error(error);
    };
};
window.addEventListener("DOMContentLoaded", async (event) => {
    todoListArr = await jsonBinGetTasks();
    if (todoListArr !== null) loading.remove();
    console.log(todoListArr);
    // let tasks = JSON.parse(localStorage.getItem('my-todo') || '[]');
    // todoListArr = tasks;
    getAndShow(todoListArr);
});
    