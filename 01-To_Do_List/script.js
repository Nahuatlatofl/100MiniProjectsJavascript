let attach = document.getElementById('attach-0');
let input = document.getElementById('input-A');
let fields = document.getElementsByClassName('todoList');
let buttonDelete = document.getElementsByClassName('todoList__buttonDelete');
let list = document.querySelector('#list-0');
let text = document.querySelector('#p-add');
let id = 1;

let createNewTask = function (id) {
    const TodoList = document.createElement('div');
    TodoList.classList.add('todoList');

    const TodoListInput = document.createElement('div');
    TodoListInput.classList.add('todoList__input');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // Establecer el tipo como checkbox
    checkbox.classList.add('todoList__checkbox');
    checkbox.id = 'input-' + id;

    const label = document.createElement('label');
    label.classList.add('todoList__label');
    label.textContent = input.value; // Usar el valor del input
    label.htmlFor = 'input-' + id;

    const buttonDelete = document.createElement('button'); 
    buttonDelete.classList.add('todoList__buttonDelete');

    buttonDelete.textContent = 'delete';

    list.appendChild(TodoList);

    TodoList.appendChild(TodoListInput);
    TodoListInput.appendChild(checkbox);
    TodoListInput.appendChild(label);

    TodoList.appendChild(buttonDelete);
    window.getComputedStyle(label).getPropertyValue('display');
}

let addNewTask = function(){
    if(input.value == ''){
        alert("There are no tasks added");
    }else{
        createNewTask(id);
        Array.from(buttonDelete).forEach((element, index) => {
            let field = element.parentNode;
            console.log('padre: ' + field + ' de: ' + element);
            
            element.addEventListener("click", (e) => {
                field.remove();  
                getCant();         
            });
        });
        getCant();

        input.value = '';
        id++;
    }
}

attach.addEventListener('click', function () {
    addNewTask();
});

document.getElementById('input-A').addEventListener("keyup", function(event) {
    // Verificar si la tecla presionada es Enter ("Enter" en lugar de keyCode 13)
    if (event.key === "Enter") {
        addNewTask();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    Array.from(buttonDelete).forEach((element, index) => {
        let field = element.parentNode;
        console.log('padre: ' + field + ' de: ' + element);
        
        element.addEventListener("click", (e) => {
            field.remove();  
            getCant();         
        });
    });
    input.focus();
})

let getCant= function(){
    Array.from(buttonDelete).forEach((element,index) => {
        text.textContent = index;
    })
}
