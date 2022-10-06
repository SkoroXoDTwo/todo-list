const mainSection = document.querySelector('.main');
const taskListSection = document.querySelector('.task__list');
const documentElement = document.documentElement;
const formAddTask = document.querySelector('.task__form');
const inputTextTask = formAddTask.querySelector('.task__textarea');
const formAddTaskBtn = formAddTask.querySelector('.task__add-btn');
const taskItemTemplate = document.querySelector('#task-list-option-template').content;
let itemListActionEdit;
let typeSumbitForm = 'add';
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

function editTaskListItem (item, text) {
  inputTextTask.value = text;
  itemListActionEdit = item;
  typeSumbitForm = 'edit';
  formAddTaskBtn.textContent = typeSumbitForm;
}

function createTaskListItem (text) {
  const listItem = taskItemTemplate.querySelector('.task__list-item').cloneNode(true);
  const textItem = listItem.querySelector('.task__item-text');
  const deleteBtnItem = listItem.querySelector('.task__item-btn_type_delete');
  const editBtnItem = listItem.querySelector('.task__item-btn_type_edit');
  textItem.textContent = text;
  deleteBtnItem.addEventListener('click', () => { deleteTaskListItem(listItem); });
  editBtnItem.addEventListener('click', () => { editTaskListItem(listItem, text); });

  return listItem;
}

function formTaskSubmitHandler (evt) {
  evt.preventDefault();
  if (typeSumbitForm === 'add') {
    taskListSection.append(createTaskListItem(inputTextTask.value));
    inputTextTask.value = '';
  }

  if (typeSumbitForm === 'edit') {
    const textItem = itemListActionEdit.querySelector('.task__item-text');
    textItem.textContent = inputTextTask.value;
    typeSumbitForm = 'add';
    formAddTaskBtn.textContent = typeSumbitForm;
    inputTextTask.value = '';
  }
}

changeHeightSectionTask();

window.addEventListener('resize', () => { changeHeightSectionTask(); });
formAddTask.addEventListener('submit', formTaskSubmitHandler);
