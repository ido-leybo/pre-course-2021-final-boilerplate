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
let idArr = [];

// class Task {
//     constructor(text, priority) {}
// }
//add a "add" button to add more tasks to the Todo list every "click"
addButton.addEventListener("click", () => {
    taskToList();
    plusCounter();
    
});
//add a sort button to sort the list by priority value
sortButton.addEventListener("click", sortTasks);
function getAndShow() { // get the list from the sort action or from the local storage and show it in the html
    if (todoListArr[0]) {
        for (let task of todoListArr) {     
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
        date: getCurrentDate()
    };
    containerId++;
    displayTask(task);
    todoListArr.push(task);
    // jsonBinPostTask(task)
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
};
function deleteTaskView(event) {  // delete a task from the list and from the local storage.
    todoCounter--;
    counter.innerText = todoCounter;
    // window.localStorage.removeItem('my-todo');
    let removeDiv = event.target.parentElement;
    let id = removeDiv.id;
    removeDiv.remove();
    // localStorage.setItem('task-id', JSON.stringify(id)); // Need to check how to delete or change the id from localStorage!!!!!!
    console.log(localStorage);
    todoListArr = todoListArr.filter((task) => task.taskId !== id);
    console.log(todoListArr)
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
    // let taskToDelete = todoListArr.find(task => task.taskId === id);
    // jsonBinDeleteTask(taskToDelete.id);
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
    getAndShow();
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
// async function jsonBinPostTask(task) {
//     try {
//         const response = await fetch("https://api.jsonbin.io/v3/b", {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json",
//             'X-Master-Key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f.",
//             'X-Collection-Id': "6012ac356bdb326ce4bc5f92",
//             'X-Bin-Private': false,
//             'X-Bin-Name': `task${task.taskId}`
//         },
//         body: JSON.stringify(task)
//         });
//         console.log(response);
//     } catch (error) {
//         console.error(error);
//     }
// };

// async function jsonBinGetAllTasks() {
//     try {
//         const allTasks = await fetch("https://api.jsonbin.io/v3/c/6012ac356bdb326ce4bc5f92/bins/1", {
//             method: "GET",
//             headers: {
//                 'X-Master-Key': "$2b$10$trCW.rdQAELT6mq2K5yQE.oywgCXlAnA2tO3Ooj03jYKDLz6jo8f."
//             },
//         })
//         const text = await allTasks.text();
//         const json = JSON.parse(text);
//         console.log(allTasks);
//         // todoListArr = allTasks
//     } catch (error) {
//         console.error(error);
//     };
// };

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

window.addEventListener("DOMContentLoaded", async(event) => {
//     // await jsonBinGetAllTasks();
    let tasks = JSON.parse(localStorage.getItem('my-todo') || '[]');
    todoListArr = tasks;
    getAndShow();
});
    