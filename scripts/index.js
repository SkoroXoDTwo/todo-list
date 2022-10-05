const mainSection = document.querySelector('.main');
const taskListSection = document.querySelector('.task__list');
const documentElement = document.documentElement;
let isDesctopPositionSection = () => document.documentElement.offsetWidth > 700;
let getHeightScrollScreen = () => documentElement.scrollHeight - window.innerHeight;

function changeHeightSectionTask () {
 // console.log(window.VisualViewport.height);
  mainSection.removeAttribute('style');
  taskListSection.removeAttribute('style');

  if (isDesctopPositionSection()) {
    mainSection.style.height = (mainSection.offsetHeight - getHeightScrollScreen()) + 'px';
  }
  else {
    taskListSection.style.height = (taskListSection.offsetHeight - getHeightScrollScreen()) + 'px';
  }
}

changeHeightSectionTask();

window.addEventListener('resize', () => { changeHeightSectionTask();});
