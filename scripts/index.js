const mainSection = document.querySelector('.main');
const taskListSection = document.querySelector('.task__list');
const documentElement = document.documentElement;
const formAddTask = document.querySelector('.task__form');
const inputTextTask = formAddTask.querySelector('.task__textarea');
const taskItemTemplate = document.querySelector('#task-list-option-template').content;
let isDesctopPositionSection = () => document.documentElement.offsetWidth > 700;
let getHeightScrollScreen = () => documentElement.scrollHeight - documentElement.offsetHeight;


function changeHeightSectionTask () {
  mainSection.removeAttribute('style');
  taskListSection.removeAttribute('style');

  if (isDesctopPositionSection()) {
    mainSection.style.height = (mainSection.offsetHeight - getHeightScrollScreen()) + 'px';
  }
  else {
    taskListSection.style.height = (taskListSection.offsetHeight - getHeightScrollScreen()) + 'px';
  }
}

function deleteTaskListItem (item) {
  item.remove();
}

function createTaskListItem (text) {
  const listItem = taskItemTemplate.querySelector('.task__list-item').cloneNode(true);
  const textItem = listItem.querySelector('.task__item-text');
  const deleteBtnItem = listItem.querySelector('.task__item-btn_type_delete');
  deleteBtnItem.addEventListener('click', () => { deleteTaskListItem(listItem); });

  textItem.textContent = text;
  return listItem;
}

function formTaskSubmitHandler (evt) {
  evt.preventDefault();
  taskListSection.append(createTaskListItem(inputTextTask.value));
  inputTextTask.value = '';
}

changeHeightSectionTask();

window.addEventListener('resize', () => { changeHeightSectionTask(); });
formAddTask.addEventListener('submit', formTaskSubmitHandler);
