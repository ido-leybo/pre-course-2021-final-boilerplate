 const viewSection = document.getElementById('viewSection');
const button = document.getElementById("add-button");
const counter = document.getElementById('counter');
let todoCounter = 0;
counter.innerText = todoCounter;
const selector = document.getElementById("priority-selector")
const sortButton = document.getElementById('sort-button');
const ul = document.createElement("ul")
viewSection.appendChild(ul);

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

    divPriority.append(selectorValue);
    div.append(divPriority);
    div.append(divDate);
    div.append(divText);
    ul.appendChild(div);
});




