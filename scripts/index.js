const mainSection = document.querySelector('.main');
const groupListSection = document.querySelector('.group__list');
const groupSelectSection = document.querySelector('.group__select');
const taskListSection = document.querySelector('.task__list');
const documentElement = document.documentElement;
const formAddTask = document.querySelector('.task__form');
const inputTextTask = formAddTask.querySelector('.task__textarea');
const formAddTaskBtn = formAddTask.querySelector('.task__add-btn');
const taskItemTemplate = document.querySelector('#task-list-option-template').content;
const groupListItemTemplate = document.querySelector('#group-list-item-template').content;
const groupSelectItemTemplate = document.querySelector('#group-select-item-template').content;

const btnDeleteGroupItemMobile = document.querySelector('.group__item-btn_type_delete-mobile');

const popupAddGroup = document.querySelector('#popup-add-group');
const popupAddGroupForm = popupAddGroup.querySelector('.popup__form');
const popupAddGroupInput = popupAddGroupForm.querySelector('.popup__input');
const popupAddGroupSubmitBtn = popupAddGroupForm.querySelector('.popup__btn');
const popupAddGroupOpenBtn = document.querySelector('.group__add-btn');

const popupDeletedGroup = document.querySelector('#popup-delete-group');
const popupDeleteGroupForm = popupDeletedGroup.querySelector('.popup__form');
const popupDeleteGroupTitle = popupDeletedGroup.querySelector('.popup__title');

let itemListActionEdit;
let typeSumbitForm = 'add';
let selectGroup = initialTaskListItems[0].group;
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function deleteItem (item) {
  item.remove();
}

function deleteOpion(textItem) {
  const options = groupSelectSection.querySelectorAll('.group__select-option');
  options.forEach((option) => {
    if(option.textContent == textItem) {
      deleteItem(option);
    }
  });
}

function addGroupInInitialListItems () {
  initialTaskListItems.push({ group: popupAddGroupInput.value, tasks: [] });
}

function deleteGroupInInitialListItems (textItem) {
  initialTaskListItems.forEach((groupList, index) => {
    if (groupList.group === textItem) {
      initialTaskListItems.splice(index, 1);
    }
  });
}

function addTaskInInitialListItems () {
  initialTaskListItems.forEach((item) => {
    if (item.group === selectGroup) {
      item.tasks.push({text: inputTextTask.value, checkbox: false});
    }
  });
}

function deleteTaskInInitialListItems (item) {
  const textItem = item.querySelector('.task__item-text').textContent;
  initialTaskListItems.forEach((groupList) => {
    if (groupList.group === selectGroup) {
      groupList.tasks.forEach((taskList, index) => {
        if(taskList.text === textItem) {
          groupList.tasks.splice(index, 1);
        }
      });
    }
  });
}

function checkedTaskInInitialListItems(item) {
  const textItem = item.querySelector('.task__item-text').textContent;
  initialTaskListItems.forEach((groupList) => {
    if (groupList.group === selectGroup) {
      groupList.tasks.forEach((taskList, index) => {
        if(taskList.text === textItem) {
          groupList.tasks[index].checkbox = !groupList.tasks[index].checkbox;
        }
      });
    }
  });
}

function editTaskInInitialListItems() {
  const item = document.querySelector('.task__list-item_type_edit');
  const textItem = item.querySelector('.task__item-text').textContent;

  initialTaskListItems.forEach((groupList) => {
    if (groupList.group === selectGroup) {
      groupList.tasks.forEach((taskList, index) => {
        if(taskList.text === textItem) {
          groupList.tasks[index].text = inputTextTask.value;
        }
      });
    }
  });
}

function fillFormEditTaskListItem (item, text) {
  inputTextTask.value = text;
  itemListActionEdit = item;
  typeSumbitForm = 'edit';
  formAddTaskBtn.textContent = typeSumbitForm;
}

function addTaskItemClassEdit (item) {
  item.classList.add('task__list-item_type_edit');
}

function deleteTaskItemClassEdit () {
  const item = document.querySelector('.task__list-item_type_edit');
  if(item) {
    item.classList.remove('task__list-item_type_edit');
  }
}

function changeBtnFormIsAdd () {
  typeSumbitForm = 'add';
  formAddTaskBtn.textContent = typeSumbitForm;
  inputTextTask.value = '';
}

function editTaskListItem () {
  const textItem = itemListActionEdit.querySelector('.task__item-text');
  textItem.textContent = inputTextTask.value;
  changeBtnFormIsAdd();
}

function changeSelected () {
  let opts = groupSelectSection.options;

  for(let i = 0; i < opts.length; i++) {
    if(opts[i].textContent === selectGroup) {
      groupSelectSection.getElementsByTagName('option')[i].selected = true;
      break;
    }
  }
}

function activeGroupListItem (textItem) {
  const groups = groupListSection.querySelectorAll('.group__list-item');
  const activeGroup = groupListSection.querySelector('.group__list-item_active');
  if(activeGroup !== null) {
    activeGroup.classList.remove('group__list-item_active');
  }

  groups.forEach((group) => {
    const groupName = group.querySelector('.group__item-text');
    if(groupName.textContent == textItem) {
      group.classList.add('group__list-item_active');
    }
  });

  selectGroup = textItem;

  changeBtnFormIsAdd();
  changeSelected();
  renderTaskList(initialTaskListItems);
}

function activeGroupSelectItem () {
  selectGroup = groupSelectSection.options[groupSelectSection.selectedIndex].text;
  renderTaskList(initialTaskListItems);
  activeGroupListItem(selectGroup);
}

function toggleEnabledBtnAddTask  () {
  if(initialTaskListItems.length !== 0) {
    activeGroupListItem(initialTaskListItems[0].group);
   }
   else {
    popupAddGroupOpenBtn.classList.add('group__add-btn_scale-animation');
    inputTextTask.placeholder = 'Create a group...';
    inputTextTask.classList.add('task__textarea_placeholder-red');
    inputTextTask.disabled = true;
    formAddTaskBtn.disabled = true;
    formAddTaskBtn.classList.add('task__add-btn_disabled');
    taskListSection.innerHTML = '';
   }
}

function createGroupListItem (text) {
  const listItem = groupListItemTemplate.querySelector('.group__list-item').cloneNode(true);
  const textItem = listItem.querySelector('.group__item-text');
  const btnDeleteItem = listItem.querySelector('.group__item-btn_type_delete');
  listItem.addEventListener('click', () => { activeGroupListItem(textItem.textContent); });
  btnDeleteItem.addEventListener('click', (evt) => {
    popupDeleteGroupTitle.textContent = `Are you sure you want to delete the "${textItem.textContent}" group?`;
    openPopup(popupDeletedGroup);
    listItem.classList.add('group__list-item_animation_delete');
     evt.stopImmediatePropagation();
    });
  textItem.textContent = text;

  return listItem;
}

function createGroupSelectItem (text) {
  const listItem = groupSelectItemTemplate.querySelector('.group__select-option').cloneNode(true);
  listItem.textContent = text;

  return listItem;
}

function createTaskListItem (text, checkbox) {
  const listItem = taskItemTemplate.querySelector('.task__list-item').cloneNode(true);
  const textItem = listItem.querySelector('.task__item-text');
  const checkboxItem = listItem.querySelector('.task__checkbox');
  const deleteBtnItem = listItem.querySelector('.task__item-btn_type_delete');
  const editBtnItem = listItem.querySelector('.task__item-btn_type_edit');
  textItem.textContent = text;
  checkboxItem.checked = checkbox;

  checkboxItem.addEventListener('change', () => { checkedTaskInInitialListItems(listItem); });

  deleteBtnItem.addEventListener('click', () => {
    changeBtnFormIsAdd();
    deleteItem(listItem);
    deleteTaskInInitialListItems(listItem);
  });

  editBtnItem.addEventListener('click', () => {
    deleteTaskItemClassEdit();
    addTaskItemClassEdit(listItem);
    fillFormEditTaskListItem(listItem, text);
  });

  return listItem;
}

function renderGroupListItem (text) {
    const item = createGroupListItem(text);
    groupListSection.append(item);
}

function renderGroupSelectItem (text) {
  const item = createGroupSelectItem(text);
  groupSelectSection.append(item);
}

function renderGroups (containerItem) {
  containerItem.forEach((item) => {
    renderGroupListItem(item.group);
    renderGroupSelectItem(item.group);
  });
}

function renderTaskListItem (text, checkbox) {
  const item = createTaskListItem(text, checkbox);
  taskListSection.append(item);
}

function renderTaskList (item) {
  taskListSection.innerHTML = '';
  item.forEach((item) => {
    if (item.group === selectGroup) {
      item.tasks.forEach((task) => { renderTaskListItem(task.text, task.checkbox); });
    }
  });
}

function renderMain (containerItem) {
  renderGroups(containerItem)
  renderTaskList(containerItem);
  activeGroupListItem(initialTaskListItems[0].group);
}

function formTaskSubmitHandler (evt) {
  evt.preventDefault();

  switch (typeSumbitForm) {
    case 'add':
      addTaskInInitialListItems();
      renderTaskListItem(inputTextTask.value, false);
      inputTextTask.value = '';
        break;
    case 'edit':
      editTaskInInitialListItems();
      deleteTaskItemClassEdit();
      editTaskListItem();
  }
}

function enabledAddTaskBtn() {
  if(initialTaskListItems.length === 0) {
    popupAddGroupOpenBtn.classList.remove('group__add-btn_scale-animation');
    inputTextTask.placeholder = 'Enter the text...';
    inputTextTask.classList.remove('task__textarea_placeholder-red');
    inputTextTask.disabled = false;
    formAddTaskBtn.disabled = false;
    formAddTaskBtn.classList.remove('task__add-btn_disabled');
  }
}

function submitPopupAddGroupForm(evt) {
  evt.preventDefault();

  enabledAddTaskBtn();
  addGroupInInitialListItems();
  renderGroupListItem(popupAddGroupInput.value);
  renderGroupSelectItem(popupAddGroupInput.value);
  activeGroupListItem(popupAddGroupInput.value);
  popupAddGroupInput.value = '';
  closePopup(popupAddGroup);
}

function submitPopupDeleteGroupForm(evt) {
  evt.preventDefault();

  const item = groupListSection.querySelector('.group__list-item_animation_delete');
  const textItem = item.querySelector('.group__item-text').textContent;
  deleteItem(item);
  deleteOpion(textItem);
  deleteGroupInInitialListItems(textItem);
  toggleEnabledBtnAddTask();
  closePopup(popupDeletedGroup);
}

function addClassAnimationDeleteGroupItem () {
  const items = groupListSection.querySelectorAll('.group__list-item');
  items.forEach((item) => {
    const textItem = item.querySelector('.group__item-text').textContent;
    if(textItem === selectGroup) {
      item.classList.add('group__list-item_animation_delete');
    }
  });
}

function removeClassAnimationDeleteGroupItem () {
  const item = groupListSection.querySelector('.group__list-item_animation_delete');
  if(item) {
    item.classList.remove('group__list-item_animation_delete');
  }
}

function addListenerClosePopupBtns() {
  const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        removeClassAnimationDeleteGroupItem();
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        removeClassAnimationDeleteGroupItem();
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__btn_type_delete-no')) {
        removeClassAnimationDeleteGroupItem();
        closePopup(popup)
      }

    });
  });
}

function validationPopupFormAddGroup () {
  popupAddGroupSubmitBtn.classList.remove('popup__btn_disabled');
  popupAddGroupSubmitBtn.disabled = false;

  initialTaskListItems.forEach((item) => {
    if(item.group === popupAddGroupInput.value || popupAddGroupInput.value.length === 0) {
      popupAddGroupSubmitBtn.classList.add('popup__btn_disabled');
      popupAddGroupSubmitBtn.disabled = true;
    }
  });
}

changeHeightSectionTask();
renderMain(initialTaskListItems);
window.addEventListener('resize', () => { changeHeightSectionTask(); });
formAddTask.addEventListener('submit', formTaskSubmitHandler);

addListenerClosePopupBtns();

popupAddGroupOpenBtn.addEventListener('click', () => {
  validationPopupFormAddGroup();
  openPopup(popupAddGroup)
});

popupAddGroupForm.addEventListener('submit', submitPopupAddGroupForm);
popupDeleteGroupForm.addEventListener('submit', submitPopupDeleteGroupForm);

groupSelectSection.addEventListener('change', activeGroupSelectItem);

btnDeleteGroupItemMobile.addEventListener('click', () => {
  popupDeleteGroupTitle.textContent = `Are you sure you want to delete the "${selectGroup}" group?`;
  openPopup(popupDeletedGroup);
  addClassAnimationDeleteGroupItem();
});

popupAddGroupInput.addEventListener('input', validationPopupFormAddGroup);

