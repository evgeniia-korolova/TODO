const handleFormBtn = document.querySelector('.handle-form__btn');
const modal = document.querySelector('.modal');
const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('.add-task__btn');
const taskList = document.querySelector('.task__list');
const startMessage = document.querySelector('.start__text');
const inputLabel = document.querySelector('.add-task__label');
const headerWrapper = document.querySelector('.header__container');
const formTaskBtn = document.querySelector('.category-btn');
const modalCloseBtn = document.querySelector('.modal__close');
const options = document.querySelectorAll('.bubble');
const newTodoForm = document.querySelector('#new-todo-form');

let counter = 0,
    
    todos = [],
	category;

function handleModal() {
	modal.classList.toggle('hidden');	
}

handleFormBtn.addEventListener('click', handleModal);
modalCloseBtn.addEventListener('click', handleModal);

newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
   
    // let task = taskInput.value;
    let currentContent = e.target.elements.content.value;
    let currentCategory = e.target.elements.category.value;
    
    if (!currentContent) {
        taskInput.placeholder = 'Add new task';
        taskInput.classList.toggle('task-input__warning');
    }
    else if (!currentCategory) { 
        document.querySelector('.modal__title ').classList.add('warning');
    } else {
       
        startMessage.classList.add('hidden');
        document.querySelector('.modal__title ').classList.remove('warning');

		const todo = {
			content: currentContent,
			category: currentCategory,
			completed: false,
			id: todos.length + 1,
			createdAt: new Date().getTime(),
		};

		todos.push(todo);
		let newTask = createTask(taskInput.value);

		taskList.append(newTask);
		e.target.reset(currentContent);
		taskInput.placeholder = '';

		handleModal();
    }
 
    
    console.log(todos);

    
})

function createTask(task) {
    let taskBlock = document.createElement('div');
	taskBlock.classList.add('task-block');
	let checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	let taskText = document.createElement('input');
	taskText.value = task;
	taskText.type = 'text';
	taskText.classList.add('task__text');

	let deleteBtn = document.createElement('button');

	deleteBtn.classList.add('delete-task__btn');
    deleteBtn.setAttribute('data-delete-btn', 'delete-task__btn');
    
    let changeTaskBtn = document.createElement('button');
	changeTaskBtn.classList.add('btn');
	changeTaskBtn.textContent = 'Edit';

	taskBlock.append(checkbox);
	taskBlock.append(taskText);
	taskBlock.append(deleteBtn);
    taskBlock.append(changeTaskBtn);
    
    return taskBlock;
}

taskList.addEventListener('click', handleCopletedTask);

function handleCopletedTask(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT' && target.type !== 'checkbox') return;
	if (target.checked) {
		target.nextSibling.classList.add('completed-task');
		
	} else {
		target.nextSibling.classList.remove('completed-task');
	}
}

taskList.addEventListener('click', deleteTask);

function deleteTask(event) {
	let target = event.target;
	let action = target.dataset.deleteBtn;

	if (action) {
		target.parentElement.classList.remove('task-block');
		target.parentElement.classList.add('hidden');
	}
}

// function addTaskHandler() {
//     if (taskInput.value) {
// 		startMessage.classList.add('hidden');

// 		let newTask = createTask(taskInput.value);

// 		taskList.append(newTask);
// 	} else {
// 		taskInput.placeholder = 'Add new task';
// 	}
// }
