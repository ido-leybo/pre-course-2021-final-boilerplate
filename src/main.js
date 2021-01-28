const button = document.getElementById("add-button");
const sortButton = document.getElementById('sort-button');
const deleteButton = document.createElement("button");
deleteButton.classList.add("delete-button");
deleteButton.innerText = "X";
const counter = document.getElementById('counter');
let todoCounter = 0;
counter.innerText = todoCounter;
let todoListArr = [];
let sortArr = [];
//add a "add" button to add more tasks to the Todo list every "click"
button.addEventListener("click", () => {
    addContainer()
    addTaskToView();
});
    //add a done button to remove the task we done //need to work on
deleteButton.addEventListener("click", event => {
    deleteTaskView(event)
}); 
//need to work on
sortButton.addEventListener("click", sortTasks());

function addTaskToView() {
    const viewSection = document.getElementById('viewSection');
    for (let task of todoListArr) {
        viewSection.appendChild(task);
    }
    todoCounter++
    counter.innerText = todoCounter;
};
function deleteTaskView(event) {
    todoCounter--;
    counter.innerText = todoCounter;
    let removeDiv = event.target.closest('.todo-container');
    removeDiv.remove();
}
function addContainer() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('todo-container');
    const divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    const selector = document.getElementById("priority-selector");
    let selectorValue = selector.value;
    const divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    const divText = document.createElement('div');
    divText.classList.add('todo-text');
    mainDiv.append(divPriority);
    mainDiv.append(divDate);
    mainDiv.append(divText);
    divPriority.innerText = selectorValue;
    divDate.innerText = getCurrentDate();
    divText.innerText = input_text();
    todoListArr.push(mainDiv);
};
function input_text() {
    let inputText = document.getElementById('text-input').value;
    document.getElementById('text-input').value = '';
    document.getElementById('text-input').focus();
    return inputText;
}
function getCurrentDate() {
    const date = new Date(); 
    let nDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return nDate;
};


//need to work on
function sortTasks() {

}



