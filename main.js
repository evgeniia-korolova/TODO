const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('.add-task__btn');
const taskList = document.querySelector('.task__list');
const startMessage = document.querySelector('.start__text');
const inputLabel = document.querySelector('.add-task__label');

addTaskBtn.addEventListener('click', addTaskHandler)

function createTask(task) {
    let taskBlock = document.createElement('div');
    taskBlock.classList.add('task-block')
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    let taskText = document.createElement('p');
    taskText.textContent = task;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Del';

    let changeTaskBtn = document.createElement('button');
    changeTaskBtn.textContent = 'Change Task';

    taskBlock.append(checkbox);
    taskBlock.append(taskText);
    taskBlock.append(deleteBtn);
    taskBlock.append(changeTaskBtn);


    return taskBlock;
}

function addTaskHandler() {
    
    if (taskInput.value) {
        startMessage.classList.add('hidden');

        let newTask = createTask(taskInput.value);
        taskList.append(newTask);
        taskInput.value = '';
        // if (inputLabel.classList.contains('warning')) {
        //     inputLabel.classList.remove('warning');
        // }
       
    }
    else { 
        taskInput.placeholder = 'Add new task';
        
        // inputLabel.classList.add('warning');
    }
}



taskList.addEventListener('click', (event) => {
    let target = event.target;
    if (target.tagName !== 'INPUT' && target.type !== 'checkbox') return;
    if (target.checked) {
        target.nextSibling.classList.add('completed-task');
    } else {
        target.nextSibling.classList.remove('completed-task');
    }
        
    
})