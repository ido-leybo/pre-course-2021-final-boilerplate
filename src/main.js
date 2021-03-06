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
   alert(`help!!\n\nEnter your task to do in Input and click the "Add" button.\nif you want to sort the list by priority, click on the "sort" button.\n\nyou can sort just by priority!\n\nIf you have more questions feel free to contact me on Facebook or github, the link is at the bottom of the page.`)
};
function darkModeAction() {
   
    if (!darkMode) {
        darkModeButton.classList.add("dark-head-buttons");
        helpButton.classList.add("dark-head-buttons");
        document.body.classList.add("dark-body");
        inputText.classList.add("dark-buttons");
        addButton.classList.add("dark-buttons");
        searchButton.classList.add("dark-buttons");
        undoButton.classList.add("dark-buttons");
        sortButton.classList.add("dark-buttons");
        selector.classList.add("dark-buttons");
        darkMode = true;
    } else {
        darkModeButton.classList.remove("dark-head-buttons");
        helpButton.classList.remove("dark-head-buttons");
        document.body.classList.remove("dark-body");
        inputText.classList.remove("dark-buttons");
        addButton.classList.remove("dark-buttons");
        searchButton.classList.remove("dark-buttons");
        undoButton.classList.remove("dark-buttons");
        sortButton.classList.remove("dark-buttons");
        selector.classList.remove("dark-buttons");
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
function sortTasks() {  // sort the list by priority
    clean_presented_list();
    todoListArr = todoListArr.sort((a, b) => b.priority - a.priority);
    getAndShow(todoListArr);
}
function searchGoTo() {
    let text = input_text();
    searchTodoArr = todoListArr.filter(task => task.text.includes(text));
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
function input_text() {
    let text = inputText.value;
    inputText.value = '';
    inputText.focus();
    return text;
};
function increaseTasksCounter() { // count the tasks
    tasksCounter++
    counter.innerText = tasksCounter;
};
function getCurrentDate() { // get the time that clicked
    const date = new Date(); 
    let nDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return nDate;
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
function taskToList() { // put every task in the main list and send the task to displayTask function
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
    todoListArr = todoListArr.filter((task) => task.taskId !== id);
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
    jsonBinUpdateTask(todoListArr);
}
function displayTask(task) { // put the task in div's and show them in the html
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.addEventListener("click", event => {
        deleteTaskView(event)
    });
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";
    //---    in this section all the div's are created.  ---// 
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('todo-container');
    mainDiv.setAttribute("id", `${task.taskId}`);
    // drag'n'drop section 
    mainDiv.setAttribute("draggable", true);
    mainDiv.style.cursor = "move";
    mainDiv.addEventListener("dragstart", () => { // What happens during the "dragstart"
        mainDiv.classList.add("dragging")
    });
    mainDiv.addEventListener("dragend", () => { // What happens during the "dragend"
        mainDiv.classList.remove("dragging");
        jsonBinUpdateTask(todoListArr);
    });
    viewSection.addEventListener("dragover", (event) => { // What happens during the "dragover"
        event.preventDefault();
        const afterElement = getDragAfterElement(viewSection, event.clientY);
        const draggedElement = document.querySelector('.dragging');
        const fromIndex = todoListArr.findIndex(task => task.taskId === draggedElement.id);
        if (afterElement == null) {
            viewSection.appendChild(draggedElement);
            manageArrayMovment(fromIndex, 0);
        } else {
            viewSection.insertBefore(draggedElement, afterElement);
            let toIndex = todoListArr.findIndex(task => task.taskId === afterElement.id)
            manageArrayMovment(fromIndex, toIndex - 1);
        };
    });
    const divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    const divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    const divText = document.createElement('div');
    divText.setAttribute("class", 'todo-text');
    // this section is edit button
    const editButton = document.createElement("button");
    const newText = document.createElement("input");
    newText.setAttribute("class", "new-text-input");
    editButton.innerText = "edit\ntext";
    editButton.setAttribute("class", "edit-button");
    newText.setAttribute("type", 'text');
    newText.style.display = "none";
    const submit = document.createElement("button");
    submit.setAttribute("class", "submit");
    submit.innerText = 'submit';
    submit.style.display = "none";
    editButton.addEventListener("click", event => {
        newText.style.display = "block";
        submit.style.display = "block";
    });
    submit.addEventListener("click", () => {
        if (newText.value !== '') {
            task.text = newText.value;
            divText.innerText = task.text;
        };
        newText.style.display = "none";
        submit.style.display = "none";
        todoListArr.forEach((index) => index.taskId === task.taskId ? index.text = task.text : null);
        jsonBinUpdateTask(todoListArr);
    });
    // this section is checkbox
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
    divText.append(newText);
    divText.append(submit);
    mainDiv.append(deleteButton);
    mainDiv.append(editButton);
    mainDiv.append(checkBox);
    mainDiv.append(divPriority);
    mainDiv.append(divDate);
    mainDiv.append(divText);
    viewSection.appendChild(mainDiv);
};
function getDragAfterElement(container, y) { 
    const draggableElements = [...container.querySelectorAll('.todo-container:not(.dragging')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element
}
function manageArrayMovment(fromIndex, toIndex) { // changes the array according to the new location of the tasks
    let element = todoListArr[fromIndex];
    todoListArr.splice(fromIndex, 1);
    if (toIndex === 0) {
        todoListArr.unshift(element);
    } else {
        todoListArr.splice(toIndex, 0, element);
    }
};
function clean_presented_list() { // first it cleans the shown list before the sort action
    while(viewSection.firstChild){
        viewSection.removeChild(viewSection.lastChild); 
    }
    tasksCounter = 0;
    counter.innerText = tasksCounter;
};
// jsonbin functions
async function jsonBinUpdateTask(updatedtasks) {
    const response = await fetch("https://api.jsonbin.io/v3/b/6012bc526bdb326ce4bc6662", {
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
        const allTasks = await fetch("https://api.jsonbin.io/v3/b/6012bc526bdb326ce4bc6662", {
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
    // let tasks = JSON.parse(localStorage.getItem('my-todo') || '[]');
    // todoListArr = tasks;
    getAndShow(todoListArr);
});
