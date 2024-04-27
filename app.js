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

let counter = 0,
	todos = [],
	todo,
	category;

function handleModal() {
	modal.classList.toggle('hidden');
}

handleFormBtn.addEventListener('click', handleModal);
modalCloseBtn.addEventListener('click', handleModal);

newTodoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// let task = taskInput.value;
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

		todo = {
			content: currentContent,
			category: currentCategory,
			completed: false,
			id: todos.length + 1,
			createdAt: new Date().getTime(),
			deleted: false,
		};

		todos.push(todo);
		let newTask = createTask(taskInput.value.trim());

		taskList.append(newTask);
		e.target.reset(currentContent);
		taskInput.placeholder = '';

		handleModal();
	}
	console.log(todos);
});

function createTask(task) {
	let taskBlock = document.createElement('div');
	taskBlock.classList.add('task-block');
	let checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	let taskText = document.createElement('input');
	taskText.value = task;
	taskText.type = 'text';
	taskText.classList.add('task__text');
	taskText.setAttribute('readonly', '');

	let deleteBtn = document.createElement('button');

	deleteBtn.classList.add('delete-task__btn');
	deleteBtn.setAttribute('data-delete-btn', 'delete-task__btn');

	let changeTaskBtn = document.createElement('button');
	changeTaskBtn.classList.add('btn', 'edit-task__btn');
	changeTaskBtn.textContent = 'Edit';

	taskBlock.append(checkbox);
	taskBlock.append(taskText);
	taskBlock.append(changeTaskBtn);
	taskBlock.append(deleteBtn);

	return taskBlock;
}

taskList.addEventListener('click', handleCopletedTask);

function handleCopletedTask(event) {
	let target = event.target;
	console.log(target)
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
		todo.deleted = true;
	}
}

taskList.addEventListener('click', editTask);

function editTask(event) {
	let target = event.target; //button
	if (target.tagName == "BUTTON") {
		const editedTask = target.previousSibling;
		if (target.textContent.toLowerCase() == 'edit') {
			target.textContent = 'Save';
			editedTask.removeAttribute('readonly');
			editedTask.focus();
		} else {
			target.textContent = 'Edit';
			editedTask.addEventListener(
				'blur',
				(e) => {
					console.log(e.target);
					if (!editedTask) return;
					editedTask.setAttribute('readonly', '');
					todo.content = editedTask.value;
					createTask();
				},
				true
			);
		}
	}
	
}

const personalSort = document.querySelector('#personal');
// personalSort.addEventListener('click', () => {
// 	// console.log(todos);
// 	const personalTasks = todos.filter(todo => todo.category == 'personal');
// 	console.log(personalTasks);
// })

function filterByCategory(e) {
	// let category = todos.todo.category;
	let category = e.target.id;
	switch (category) {
		case 'personal':
			console.log(todos.filter((todo) => todo.category == 'personal' && todo.deleted == false));
			break;
		case 'work':
			console.log(
				todos.filter(
					(todo) => todo.category == 'work' && todo.deleted == false
				)
			);
			break;
		case 'study':
			console.log(
				todos.filter(
					(todo) => todo.category == 'study' && todo.deleted == false
				)
			);
			break;
		
	}
}

document.querySelector('.menu__list').addEventListener('click', filterByCategory);


function showTime() {
	const timeDiv = document.createElement('div');
	timeDiv.classList.add('header__time');
	timeDiv.textContent = setDate();
	headerWrapper.append(timeDiv);
}
showTime();

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
