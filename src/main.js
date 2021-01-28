 const viewSection = document.getElementById('viewSection');
const button = document.getElementById("add-button");
const counter = document.getElementById('counter');
let todoCounter = 0;
counter.innerText = todoCounter;
const selector = document.getElementById("priority-selector")
const sortButton = document.getElementById('sort-button');
const ul = document.createElement("ul")
viewSection.appendChild(ul);
//add a "add" button to add more tasks to the Todo list every "click"
button.addEventListener("click", event => {
    todoCounter++
    counter.innerText = todoCounter;
    let div = document.createElement('div');
    div.classList.add('todo-container');
    let divPriority = document.createElement('div');
    divPriority.classList.add('todo-priority');
    let divDate = document.createElement('div');
    divDate.classList.add('todo-created-at');
    divDate.innerText = getCurrentDate();
    let divText = document.createElement('div');
    divText.classList.add('todo-text');
    let selectorValue = selector.value;
    let inputText = document.getElementById('text-input').value;
    divText.innerText = inputText;
    document.getElementById('text-input').value = '';
    document.getElementById('text-input').focus();
    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");
    doneButton.innerText = "done";
    //add a done button to remove the task we done 
    doneButton.addEventListener("click", event => {
        todoCounter--;
        counter.innerText = todoCounter;
        let removeDiv = event.target.closest('.todo-container');
        removeDiv.remove(); 
    });
    div.append(doneButton);
    divPriority.append(selectorValue);
    div.append(divPriority);
    div.append(divDate);
    div.append(divText);
    ul.append(div);
});

function getCurrentDate() {
    const date = new Date(); 
    let nDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return nDate;
};




