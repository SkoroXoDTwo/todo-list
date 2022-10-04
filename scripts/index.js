function changeSecondBlock() {
  const heightHeader = document.querySelector('.header').offsetHeight;
  const heightFooter = document.querySelector('.footer').offsetHeight;
  const heightTask = document.querySelector('.task').offsetHeight;
  const screenHeight = document.documentElement.offsetHeight;
  const screenWigth = document.documentElement.offsetWidth;
  if (screenWigth < 700) {
    document.querySelector('.group').style.maxHeight = (screenHeight - heightHeader - heightFooter - heightTask) + 'px';
  }
  else {
    document.querySelector('.group').style.maxHeight = (screenHeight - heightHeader - heightFooter) + 'px';
  }
}

changeSecondBlock();

window.addEventListener('resize', () => { changeSecondBlock(); });
