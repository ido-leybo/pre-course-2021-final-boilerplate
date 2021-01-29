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
    taskToList();
    // addTaskToViewSection();
    plusCounter();
    
});
    //add a done button to remove the task we done //need to work on

//need to work on
sortButton.addEventListener("click", sortTasks);
//
function addTaskToViewSection() { 
    if (todoListArr[0]) {
        for (let task of todoListArr) {
            displayTask(task)
            todoCounter++;
            counter.innerText = todoCounter;
        }
    }return;
};
function plusCounter() {
    todoCounter++
    counter.innerText = todoCounter;
}
function taskToList() {
    let selectorValue = selector.value;
    let task = {
        taskId: containerId,
        priority: selectorValue,
        text: input_text(),
        date: getCurrentDate()
    };
    containerId++;
    displayTask(task);
    todoListArr.push(task);
    // jsonBinPostTask(task)
    localStorage.setItem('my-todo', JSON.stringify(todoListArr));
};
function deleteTaskView(event) {
    todoCounter--;
    counter.innerText = todoCounter;
    let removeDiv = event.target.parentElement;
    let id = removeDiv.id;
    removeDiv.remove();
    todoListArr = todoListArr.filter((task) => task.taskId !== parseInt(id));
    // let taskToDelete = todoListArr.find(task => task.taskId === id);
    // jsonBinDeleteTask(taskToDelete.id);
}
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
    addTaskToViewSection();
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
    mainDiv.setAttribute("id", `${task.taskId}`);
    const divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    const divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    const divText = document.createElement('div');
    divText.setAttribute("class", 'todo-text');
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
    console.log(tasks);
    todoListArr = tasks;
    console.log(todoListArr);
    addTaskToViewSection();
});
    