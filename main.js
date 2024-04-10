const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('.add-task__btn');
const taskList = document.querySelector('.task__list');
const startMessage = document.querySelector('.start__text');
const inputLabel = document.querySelector('.add-task__label');
const headerWrapper = document.querySelector('.header__container');

function showTime() {
	const timeDiv = document.createElement('div');
	timeDiv.classList.add('header__time');
	timeDiv.textContent = setDate();
	headerWrapper.append(timeDiv);
}
showTime();

function setDate() {
	const now = new Date();
	let currentMonth,
		currentDate,
		currentHour,
		currentMinutes;
	
	let month = now.getMonth() + 1;
	if (month < 10) currentMonth = '0' + month;
	else currentMonth = month;

	let date = now.getDate();
	if (date < 10) currentDate = '0' + date;
	else currentDate = date;

	let hours = now.getHours();
	if (hours < 10) currentHour = '0' + hours;
	else currentHour = hours;

	let minutes = now.getMinutes();
	if (minutes < 10) currentMinutes = '0' + minutes;
	else currentMinutes = minutes;


	let currentTime = `${currentDate}.${currentMonth}.${now.getFullYear()}  ${currentHour}:${currentMinutes}`;
	return currentTime;
}

console.log(setDate());

addTaskBtn.addEventListener('click', addTaskHandler);

function createTask(task) {
	let taskBlock = document.createElement('div');
	taskBlock.classList.add('task-block');
	let checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	let taskText = document.createElement('p');
	taskText.textContent = task;
	taskText.classList.add('.task__text');

	let deleteBtn = document.createElement('button');
	
	deleteBtn.classList.add ('delete-task__btn');
	deleteBtn.setAttribute('data-delete-btn', 'delete-task__btn');
	// let deleteBtnImg = document.createElement('img');
	// deleteBtnImg.src = './img/garbage-bin.svg';
	// deleteBtnImg.classList.add('delete-btn__img');
	// deleteBtnImg.setAttribute('data-delete-btn', 'delete-task__btn');
	// deleteBtn.append(deleteBtnImg);

	let changeTaskBtn = document.createElement('button');
	changeTaskBtn.textContent = 'Edit';

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
		
	} else {
		taskInput.placeholder = 'Add new task';		
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
});

taskList.addEventListener('click', deleteTask);

function deleteTask(event) {
	let target = event.target;
	let action = target.dataset.deleteBtn;

	if (action) {
		target.parentElement.classList.remove('task-block');
		target.parentElement.classList.add('hidden');
	}
}
