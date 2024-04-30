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
const taskContent = document.querySelector('.task__text');

let todos = [];

function handleModal() {
	modal.classList.toggle('hidden');
}

handleFormBtn.addEventListener('click', handleModal);
modalCloseBtn.addEventListener('click', handleModal);

newTodoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let currentContent = e.target.elements.content.value.trim();
	let currentCategory = e.target.elements.category.value;

	if (!currentContent) {
		taskInput.placeholder = 'Add new task';
		taskInput.classList.add('task-input__warning');
		return;
	} else if (!currentCategory) {
		document.querySelector('.modal__title ').classList.add('warning');
		return;
	} else {
		startMessage.classList.add('hidden');
		document.querySelector('.modal__title ').classList.remove('warning');
		taskInput.classList.remove('task-input__warning');

		

        let newTask = new Task(taskInput.value, currentCategory);
        newTask.createTask(taskList);

        
        
		todos.push(newTask);
		
		e.target.reset(currentContent);
		taskInput.placeholder = '';

		handleModal();
	}
	console.log(todos);
});

class Task {
	constructor(content, category,id = Date.now()) {
		this.content = content;
		this.category = category;
		this.completed = false;
		this.taskDate = setTaskDate();
		this.deleted = false;
        this.id = id;
        this.taskBlock = null;
	}

	
	createTask(element) {
		this.taskBlock = document.createElement('li');
		this.taskBlock.classList.add('task-block');

		let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        

		let createDate = document.createElement('p');
		createDate.textContent = setTaskDate();
		createDate.classList.add('task__date');

		let taskText = document.createElement('input');
		taskText.value = this.content;
		taskText.type = 'text';
		taskText.classList.add('task__text');
        taskText.setAttribute('readonly', '');

        checkbox.addEventListener('click', () =>
			this.changeState(this.content)
        );
        
        if (this.completed) {
			this.content.classList.add('completed-task');
			checkbox.checked = true;
		}

		let deleteBtn = document.createElement('button');

		deleteBtn.classList.add('delete-task__btn');
		deleteBtn.setAttribute('data-delete-btn', 'delete-task__btn');

		let changeTaskBtn = document.createElement('button');
		changeTaskBtn.classList.add('btn', 'edit-task__btn');
		changeTaskBtn.textContent = 'Edit';

		this.taskBlock.append(createDate);
		this.taskBlock.append(checkbox);
		this.taskBlock.append(taskText);
		this.taskBlock.append(changeTaskBtn);
		this.taskBlock.append(deleteBtn);

		element.append(this.taskBlock);
	}

	changeState(element) {
		this.completed = !this.completed;
		element.classList.toggle('completed-task');
	}
}

function getZero(num) {
	if (num >= 0 && num < 10) {
		return '0' + num;
	} else {
		return num;
	}
}

function setDate() {
	const now = new Date();
	let currentMonth, currentDate, currentHour, currentMinutes;

	let month = now.getMonth() + 1;
	currentMonth = getZero(month);

	let date = now.getDate();
	currentDate = getZero(date);

	let hours = now.getHours();
	currentHour = getZero(hours);

	let minutes = now.getMinutes();
	currentMinutes = getZero(minutes);

	let currentTime = `${currentDate}.${currentMonth}.${now.getFullYear()}  ${currentHour}:${currentMinutes}`;
	return currentTime;
}

function setTaskDate() {
	const now = new Date();
	let currentMonth, currentDate, currentHour, currentMinutes;

	let month = now.getMonth() + 1;
	currentMonth = getZero(month);

	let date = now.getDate();
	currentDate = getZero(date);

	let currentTime = `${currentDate}.${currentMonth}.${now.getFullYear()}`;
	return currentTime;
}