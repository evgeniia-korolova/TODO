const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('.add-task__btn');
const taskList = document.querySelector('.task__list');
const startMessage = document.querySelector('.start__text');
const inputLabel = document.querySelector('.add-task__label');
const headerWrapper = document.querySelector('.header__container');
const formTaskBtn = document.querySelector('.category-btn');
const modalCloseBtn = document.querySelector('.modal__close');
const options = document.querySelectorAll('.bubble');

let counter = 0,
	category = '';
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

console.log(setDate());

addTaskBtn.addEventListener('click', handleModal);
modalCloseBtn.addEventListener('click', handleModal);
formTaskBtn.addEventListener('click', addTaskHandler);
// formTaskBtn.addEventListener('click', handleCategory);

function handleModal() {	

	if (taskInput.value) {
		startMessage.classList.add('hidden');

		const modal = document.querySelector('.modal');
		modal.classList.toggle('hidden');
		
	} else {
		taskInput.placeholder = 'Add new task';
		
	}
	
}



const todoArr = [];

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
	// let deleteBtnImg = document.createElement('img');
	// deleteBtnImg.src = './img/garbage-bin.svg';
	// deleteBtnImg.classList.add('delete-btn__img');
	// deleteBtnImg.setAttribute('data-delete-btn', 'delete-task__btn');
	// deleteBtn.append(deleteBtnImg);

	let changeTaskBtn = document.createElement('button');
	changeTaskBtn.classList.add('btn');
	changeTaskBtn.textContent = 'Edit';

	taskBlock.append(checkbox);
	taskBlock.append(taskText);
	taskBlock.append(deleteBtn);
	taskBlock.append(changeTaskBtn);

	return taskBlock;
}



function addTaskHandler(event) {
	event.preventDefault();
	if (taskInput.value) {
		startMessage.classList.add('hidden');

		let newTask = createTask(taskInput.value);

		taskList.append(newTask);
		counter++;

		// let category;
		// options.forEach((item) => {
		// 	item.addEventListener('click', (event) => {
		// 		let target = event.target;

		// 		category = target.getAttribute('data-category');
		// 	});
		// });
		let currentCategory = handleCategory();
		console.log(currentCategory);

		const todoObj = {
			category: currentCategory,
			taskName: taskInput.value,
			completed: false,
			id: counter,
			createdAt: new Date().getTime(),
		};

		todoArr.push(todoObj);
		console.log(todoArr);
		
	} else {
		taskInput.placeholder = 'Add new task';
	}
	handleModal();
	taskInput.value = '';
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



function handleCategory() {
	const options = document.querySelectorAll('.bubble');
	options.forEach(item => {
		item.addEventListener('click', (event) => {
			let target = event.target;
			category = target.getAttribute('data-category');		

			console.log(category)
			return category;
		});
	});
}
