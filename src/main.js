const addButton = document.getElementById("add-button");
const sortButton = document.getElementById('sort-button');
const inputText = document.getElementById('text-input');
const viewSection = document.getElementById('viewSection'); 
const selector = document.getElementById("priority-selector");
const counter = document.getElementById('counter');
const searchButton = document.getElementById("search-button"); 
let todoCounter = 0;
let containerId = 0;
counter.innerText = todoCounter;
let todoListArr = [];
let searchTodoArr = [];
let idArr = [];
const loading = document.getElementById("loading");
let loadingPage = true;

//add a "add" button to add more tasks to the Todo list every "click"
addButton.addEventListener("click", () => {
    taskToList();
    plusCounter();
    
});
searchButton.addEventListener("click", goTo);

function goTo() {
    let text = input_text();
    searchTodoArr = todoListArr.filter(task => task.text.includes(text));
    console.log(searchTodoArr);
    clean_presented_list();
    getAndShow(searchTodoArr);
}
//add a sort button to sort the list by priority value
sortButton.addEventListener("click", sortTasks);
function getAndShow(tasksToDisplay) { // get the list from the sort action or from the local storage and show it in the html
    if (tasksToDisplay[0]) {
        for (let task of tasksToDisplay) {     
            displayTask(task);
            todoCounter++;
            counter.innerText = todoCounter;
        }
    }return;
};
function plusCounter() {
    todoCounter++
    counter.innerText = todoCounter;
}
function taskToList() { // put every task in the main list
    let selectorValue = selector.value;
    const text = input_text();
    let task = {
        taskId: `${text}${containerId}`,
        priority: selectorValue,
        text: text,
        date: getCurrentDate(),
        checked: false
    };
    containerId++;
    displayTask(task);
    todoListArr.push(task);
    jsonBinUpdateTask(todoListArr);
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
};
function deleteTaskView(event) {  // delete a task from the list and from the local storage.
    todoCounter--;
    counter.innerText = todoCounter;
    // window.localStorage.removeItem('my-todo');
    let removeDiv = event.target.parentElement;
    let id = removeDiv.id;
    removeDiv.remove();
    console.log(localStorage);
    todoListArr = todoListArr.filter((task) => task.taskId !== id);
    console.log(todoListArr)
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
    // let taskToDelete = todoListArr.find(task => task.taskId === id);
    // jsonBinDeleteTask(taskToDelete.id);
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
    todoCounter = 0;
    counter.innerText = todoCounter;
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
    divDate.innerText = task.date;
    divText.innerText = task.text;
    mainDiv.append(deleteButton);
    mainDiv.append(checkBox);
    mainDiv.append(divPriority);
    mainDiv.append(divDate);
    mainDiv.append(divText);
    console.log(mainDiv);
    viewSection.appendChild(mainDiv);
};
async function jsonBinUpdateTask(updatedtasks) {
        const response = await fetch("https://api.jsonbin.io/v3/b/6012c8c99f55707f6dfd4278", {
        method: "PUT",
        headers: {
                'Content-Type': "application/json",
                'X-Master-Key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f."             
            },
            body: JSON.stringify(updatedtasks)
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
        return json.record;
        // todoListArr = allTasks
    } catch (error) {
        console.error(error);
    };
};

// async function jsonBinDeleteTask(binId) {
//     try {
//         await fetch(`https://api.jsonbin.io/b/${binId}`, {
//             method: "DELETE",
//             headers: {
//                 'secret-key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f."
//             },
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

window.addEventListener("DOMContentLoaded", async (event) => {
    // todoListArr = await jsonBinGetTasks();
    if (todoListArr !== null) loading.remove();
    console.log(todoListArr);
    // loadingPage = false;
    let tasks = JSON.parse(localStorage.getItem('my-todo') || '[]');
    todoListArr = tasks;
    getAndShow(todoListArr);
});
    